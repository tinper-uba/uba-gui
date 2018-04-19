import React, { Component } from 'react';
import { Card, Row, Col, Button, Table, Popconfirm, Tooltip } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer,shell } from 'electron';
import util from 'common';
import { lt, ltr, gtr, satisfies, validRange, diff, clean } from 'semver';

import './DependManage.less';
const ipc = ipcRenderer;

// const data = [{
//     key: '1',
//     name: 'babel-plugin-transform-runtime',
//     require: '^6.23.0',
//     latest: '6.23.0',
//     define:'^6.20.0'
// }, {
//     key: '2',
//     name: 'uba',
//     require: '^2.3.6',
//     latest: '2.3.9',
//     define:'^2.3.6'
// }, {
//     key: '3',
//     name: 'lalala',
//     require: '~2.2.6',
//     latest: '2.4.0',
//     define:'^2.1.0'
// }];

class DependManage extends Component {
    componentDidMount = () => {
        setTimeout(async () => {
            let pkg = await util.loadDependenciesPackage(this.props.runProject);
            actions.main.save({
                dependenciesTable: pkg.dependencies,
                devDependenciesTable: pkg.devDependencies,
                dependenciesTableLoading: false,
                devDependenciesTableLoading: false
            });
        }, 1000);

    }
    componentWillUnmount = () => {
        actions.main.save({
            dependenciesTable: [],
            devDependenciesTable: [],
            dependenciesTableLoading: true,
            devDependenciesTableLoading: true
        });
    }
    updatePkg = (text, item, index) => async () => {
        console.log(item);
    }
    removePkg = (text, item, index) => () => {
        console.log('remove:', item.name)
    }
    getColumns = () => {
        return [{
            title: '包名',
            width: '40%',
            dataIndex: 'name',
            render: (text, record, index) => {
                return <Tooltip placement="right" title={record.description}>
                    <a onClick={()=>shell.openExternal(record.homepage)} href="javascript:void(0)">{text}</a>
                </Tooltip>
            }
        }, {
            title: '定义',
            width: '12%',
            dataIndex: 'define',
        }, {
            title: '当前',
            width: '12%',
            dataIndex: 'require',
        }, {
            title: '最新',
            width: '12%',
            dataIndex: 'latest',
        }, {
            title: '操作',
            width: '24%',
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
        let { dependenciesTable, devDependenciesTable, dependenciesTableLoading, devDependenciesTableLoading } = this.props;
        return (
            <div className="depend-wrap">
                <Row>
                    <Col span={12}>
                        <Card bordered={false} title={`Dependencies(${dependenciesTable.length})`} extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div>
                                <Table
                                    size="small"
                                    scroll={{ y: 160 }}
                                    bordered
                                    loading={dependenciesTableLoading}
                                    pagination={false}
                                    dataSource={dependenciesTable}
                                    rowKey={record => record.key}
                                    columns={this.getColumns()} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false} title={`devDependencies(${devDependenciesTable.length})`} extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div>
                                <Table
                                    size="small"
                                    scroll={{ y: 160 }}
                                    bordered
                                    loading={devDependenciesTableLoading}
                                    pagination={false}
                                    dataSource={devDependenciesTable}
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