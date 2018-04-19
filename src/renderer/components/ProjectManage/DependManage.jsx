import React, { Component } from 'react';
import { Card, Row, Col, Button, Table, Popconfirm, Tooltip } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, shell } from 'electron';
import util from 'common';
import { lt, ltr, gtr, satisfies, validRange, diff, clean } from 'semver';

import './DependManage.less';
const ipc = ipcRenderer;
ipc.on('uba::install::package::one::updatePkg', (event) => {
    setTimeout(async () => {
        let pkg = await util.loadDependenciesPackage(actions.main.getS().main.runProject);
        actions.main.save({
            dependenciesTable: pkg.dependencies,
            devDependenciesTable: pkg.devDependencies,
            dependenciesTableLoading: false,
            devDependenciesTableLoading: false
        });
    }, 200);
});

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
    updatePkg = (text, item, index) => () => {
        console.log(item);
        let { runProject, registry } = (actions.welcome.getInitParams());
        actions.main.save({
            dependenciesTableLoading: true,
            devDependenciesTableLoading: true
        });
        ipc.send('uba::install::package::one', {
            runProject,
            registry,
            name: item.name,
            version: item.latest
        }, 'updatePkg');
    }
    removePkg = (text, item, index) => () => {
        console.log('remove:', item);
        console.log(util.checkDiff(item.latest, item.define));
    }
    renderOpeate = (text, record, index) => {
        let isUpdate = util.diffVer(record.require, record.latest);
        let isDanger = util.checkDiff(record.latest, record.define);
        return (<span className="op-btn">
            {isUpdate && <Button onClick={this.updatePkg(text, record, index)} type="primary" size="small">更新</Button>}
            {!isUpdate && <Button disabled size="small">最新</Button>}
            <Popconfirm title="是否确认删除该包?" onConfirm={this.removePkg(text, record, index)} okText="删除" cancelText="取消">
                <Button type="danger" size="small">移除</Button>
            </Popconfirm>
        </span>)
    }
    getColumns = () => {
        return [{
            title: '包名',
            width: '40%',
            dataIndex: 'name',
            render: (text, record, index) => {
                return <Tooltip placement="right" title={record.description}>
                    <a onClick={() => shell.openExternal(record.homepage)} href="javascript:void(0)">{text}</a>
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
            render: this.renderOpeate
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