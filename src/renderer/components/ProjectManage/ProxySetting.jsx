import React, { Component } from 'react';
import { Row, Col, Button, Table, Popconfirm, Input } from 'antd';
import path from 'path';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, shell } from 'electron';
import util from 'common';
import uuid from 'uuid';
import './ProxySetting.less';

const ipc = ipcRenderer;

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input size="small" style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

class ProxySetting extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '代理地址',
            dataIndex: 'target',
            key: 'target',
            width: '30%',
            render: (text, record) => this.renderColumns(text, record, 'target')
        }, {
            title: '代理路径',
            dataIndex: 'url',
            key: 'url',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'url')
        }, {
            title: '访问地址',
            dataIndex: 'other',
            key: 'other',
            width: '30%',
            render: (text, record) => {
                return <soan>
                    protocol://domain:port{record.url}
                </soan>
            }
        }, {
            title: '操作',
            width: '20%',
            key: 'action',
            render: (text, record, index) => {
                const { editable } = record;
                return (<span>
                    {editable ? <span>
                        <Button type="primary" style={{ 'marginRight': '4px' }} onClick={() => this.save(record.key)} size="small">保存</Button>
                        <Button onClick={() => this.cancel(record.key, index)} size="small">取消</Button>
                    </span>
                        : <span><Button style={{ 'marginRight': '4px' }} onClick={() => this.edit(record.key)} size="small">编辑</Button>
                            <Popconfirm title="是否确认删除该条Proxy?" onConfirm={() => this.remove(index)} okText="删除" cancelText="取消">
                                <Button type="danger" size="small">删除</Button>
                            </Popconfirm></span>
                    }
                </span>)
            }
        }];

    }
    componentDidMount() {
        setTimeout(() => {
            let proxy = util.getUbarc(this.props.runProject).proxy;
            console.log(proxy);
            let arr = [];
            for (let i = 0; i < proxy.length; i++) {
                console.log(proxy[i]);
                arr.push({
                    key: uuid(),
                    target: proxy[i].options.target,
                    url: proxy[i].url.join(',')
                });
            }
            actions.main.save({
                proxyTableData: arr
            });
            this.cacheData = arr.map(item => ({ ...item }));
        }, 500);
    }
    renderColumns = (text, record, column) => {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange = (value, key, column) => {
        const newData = [...this.props.proxyTableData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            actions.main.save({
                proxyTableData: newData
            });
        }
    }
    edit = (key) => {
        const newData = [...this.props.proxyTableData];
        const target = newData.filter(item => key === item.key)[0];
        if (target.isNew) {
            delete target.isNew;
            target.editable = true;
            actions.main.save({
                proxyTableData: newData
            });
        } else {
            if (target) {
                target.editable = true;
                actions.main.save({
                    proxyTableData: newData
                });
            }
        }
    }
    cancel = (key, index) => {
        const newData = [...this.props.proxyTableData];
        const target = newData.filter(item => key === item.key)[0];
        if (target.isNew) {
            newData.splice(index, 1);
            actions.main.save({
                proxyTableData: newData
            });
        } else {
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                delete target.editable;
                actions.main.save({
                    proxyTableData: newData
                });
            }
        }
    }
    save = (key) => {
        const newData = [...this.props.proxyTableData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            actions.main.save({
                proxyTableData: newData
            });
            this.cacheData = newData.map(item => ({ ...item }));
            let ubarcProxy = [];
            for (let i = 0; i < this.cacheData.length; i++) {
                let url = this.cacheData[i].url;
                let target = this.cacheData[i].target;
                let item = {
                    url: url.split(','),
                    options: {
                        target: target
                    }
                }
                ubarcProxy.push(item);
            }
            //写入配置
            util.setUbarc(this.props.runProject, 'proxy', ubarcProxy);
        }
    }
    remove = (index) => {
        const newData = [...this.props.proxyTableData];
        newData.splice(index, 1);
        actions.main.save({
            proxyTableData: newData
        });
        this.cacheData = newData.map(item => ({ ...item }));
        let ubarcProxy = [];
        for (let i = 0; i < this.cacheData.length; i++) {
            let url = this.cacheData[i].url;
            let target = this.cacheData[i].target;
            let item = {
                url: url.split(','),
                options: {
                    target: target
                }
            }
            ubarcProxy.push(item);
        }
        //写入配置
        util.setUbarc(this.props.runProject, 'proxy', ubarcProxy);
    }
    handleAddProxy = () => {
        const newData = [...this.props.proxyTableData];
        const item = {
            editable: true,
            key: uuid(),
            target: 'http://',
            url: '',
            isNew: true
        };
        newData.push(item);
        actions.main.save({
            proxyTableData: newData
        });
    }
    render() {
        let { toolbarHeight, proxyTableData } = this.props;
        return (<div className="proxy-wrap">
            <Row>
                <Col span={24}>
                    <Table
                        style={{ 'height': toolbarHeight - 110 }}
                        loading={!proxyTableData.length}
                        pagination={false}
                        size="small"
                        columns={this.columns}
                        dataSource={proxyTableData}
                        title={() => <Button onClick={this.handleAddProxy} type="" style={{ 'marginLeft': '5px' }}>添加数据</Button>}
                        scroll={{ y: toolbarHeight - 150 }}
                        rowKey={record => record.key}
                    />
                </Col>
            </Row>
        </div>);
    }
}

export default connect((state) => state.main)(ProxySetting);
