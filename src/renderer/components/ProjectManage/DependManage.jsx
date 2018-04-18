import React, { Component } from 'react';
import { Card, Row, Col, Button, Table, Popconfirm } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer } from 'electron';
import util from 'common';
import { lt, ltr, gtr, satisfies, validRange, diff, clean } from 'semver';

import './DependManage.less';
const ipc = ipcRenderer;

const data = [{
    key: '1',
    name: 'babel-plugin-transform-runtime',
    require: '^6.23.0',
    latest: '6.23.0',
}, {
    key: '2',
    name: 'uba',
    require: '^2.3.6',
    latest: '2.3.9',
}, {
    key: '3',
    name: 'uba2',
    require: '~2.2.6',
    latest: '2.4.0',
}, {
    key: '4',
    name: 'uba56',
    require: '^1.0.0',
    latest: '2.3.9',
}, {
    key: '5',
    name: 'uba',
    require: '^2.3.6',
    latest: '2.3.9',
}, {
    key: '6',
    name: 'uba',
    require: '^2.3.6',
    latest: '2.3.9',
}, {
    key: '7',
    name: 'uba',
    require: '^2.3.6',
    latest: '2.3.9',
}, {
    key: '8',
    name: 'uba',
    require: '^2.3.9',
    latest: '2.3.9',
}, {
    key: '9',
    name: 'uba22',
    require: '0.3.6',
    latest: '0.3.9',
}, {
    key: '10',
    name: 'uba1',
    require: '~2.3.6',
    latest: '2.3.6',
},];

class DependManage extends Component {
    componentDidMount() {
        console.log('依赖包组件 DidMount')
    }
    updatePkg = (text, item, index) => async () => {
        //console.log(util.diffVer(item.require,item.latest));
        let pkg = await util.checkNpmLatest({
            name: 'moment',
            path: this.props.runProject
        });
        console.log(pkg);
        // console.log('update:', item.name);
        //console.log(util.checkDiff(item.latest,item.require));
        //let isUpdate = semver.lt(semver.clean(item.require), item.latest);
        // console.log(isUpdate);
    }
    removePkg = (text, item, index) => () => {
        console.log('remove:', item.name)
    }
    getColumns = () => {
        return [{
            title: '包名',
            width: '50%',
            dataIndex: 'name',
        }, {
            title: '要求',
            width: '15%',
            dataIndex: 'require',
        }, {
            title: '最新',
            width: '15%',
            dataIndex: 'latest',
        }, {
            title: '操作',
            width: '20%',
            dataIndex: 'op',
            render: (text, record, index) => {
                let isUpdate = util.diffVer(record.require, record.latest);
                return (<span className="op-btn">
                    {isUpdate && <Button onClick={this.updatePkg(text, record, index)} type="primary" size="small">更新</Button>}
                    {!isUpdate && <Button disabled size="small">最新</Button>}
                    <Popconfirm title="是否确认删除该包?" onConfirm={this.removePkg(text, record, index)} okText="删除" cancelText="取消">
                        <Button type="danger" size="small">移除</Button>
                    </Popconfirm>
                </span>)
            }
        }];
    }
    render() {
        return (
            <div className="depend-wrap">
                <Row>
                    <Col span={12}>
                        <Card bordered={false} title="Dependencies(22)" extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div>
                                <Table
                                    size="small"
                                    scroll={{ y: 160 }}
                                    bordered
                                    pagination={false}
                                    dataSource={data}
                                    rowKey={record => record.key}
                                    columns={this.getColumns()} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false} title="devDependencies(5)" extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div>
                                <Table
                                    size="small"
                                    scroll={{ y: 160 }}
                                    bordered
                                    pagination={false}
                                    dataSource={data}
                                    rowKey={record => record.key}
                                    columns={this.getColumns()} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect((state) => state.main)(DependManage);