import React, { Component } from 'react';
import { Card, Row, Col, Button, Table, Popconfirm, Tooltip,Modal,Input,message } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, shell } from 'electron';
import util from 'common';
import { lt, ltr, gtr, satisfies, validRange, diff, clean } from 'semver';

import './DependManage.less';
const ipc = ipcRenderer;
let self;
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
//单独安装一个包成功后
ipc.on('uba::install::one::success::modalInstall', async(event,log) => {
    actions.main.save({
        dependenciesTableLoading: true,
        devDependenciesTableLoading: true
    });
    self.setState({
        confirmLoading : false,
        visible : false,
        packageName:''
    });
    let pkg = await util.loadDependenciesPackage(actions.main.getS().main.runProject);
    actions.main.save({
        dependenciesTable: pkg.dependencies,
        devDependenciesTable: pkg.devDependencies,
        dependenciesTableLoading: false,
        devDependenciesTableLoading: false
    });
});
ipc.on('uba::install::one::error::modalInstall',(event,log) => {
    self.setState({
        confirmLoading : false
    });
    message.error('输入的包名不存在，请检查！');
});

//单独删除一个包成功后
ipc.on('uba::uninstall::one::success::modalUninstall', async(event,log) => {
    actions.main.save({
        dependenciesTableLoading: true,
        devDependenciesTableLoading: true
    });
    let pkg = await util.loadDependenciesPackage(actions.main.getS().main.runProject);
    actions.main.save({
        dependenciesTable: pkg.dependencies,
        devDependenciesTable: pkg.devDependencies,
        dependenciesTableLoading: false,
        devDependenciesTableLoading: false
    });
});
ipc.on('uba::uninstall::one::error::modalInstall',(event,log) => {
    message.error('删除依赖包失败！');
    actions.main.save({
        dependenciesTableLoading: false,
        devDependenciesTableLoading: false
    });
});

class DependManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode:'',
            visible:false,
            confirmLoading:false,
            packageName:''
        }
    }
    componentDidMount = () => {
        self = this;
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
        let { runProject } = (actions.welcome.getInitParams());
        actions.main.save({
            dependenciesTableLoading: true,
            devDependenciesTableLoading: true
        });
        ipc.send('uba::install::package::one', {
            runProject,
            name: item.name,
            version: item.latest
        }, 'updatePkg');
    }
    removePkg = (text, item, index) => () => {
        console.log('remove:', item);
        let { runProject } = (actions.welcome.getInitParams());
        ipc.send('uba::uninstall::one',{
            name : item.name,
            runProject,
            mode:item.mode
        },'modalUninstall');
    }
    renderOpeate = (text, record, index) => {
        if (record.latest == '-') {
            return <div>-</div>
        }
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
    //安装单独的包
    handlerInstallOnecPkg = (mode) => () => {
        this.setState({
            visible : true,
            mode
        });
    }
    handleInstallOk = () => {
        let { runProject } = (actions.welcome.getInitParams());
        this.setState({
            confirmLoading : true
        });
        console.log(this.state.packageName);
        ipc.send('uba::install::one',{
            name : this.state.packageName,
            runProject,
            mode:this.state.mode
        },'modalInstall');
    }
    handleInstallCancel = () => {
        this.setState({
            visible : false,
            confirmLoading:false,
            packageName:''
        });
    }
    handlerChangePackage = (e) => {
        this.setState({
            packageName : e.target.value
        });
    }
    render() {
        let {visible,confirmLoading,packageName} = this.state;
        let { dependenciesTable, devDependenciesTable, dependenciesTableLoading, devDependenciesTableLoading } = this.props;
        return (
            <div className="depend-wrap">
                <Row>
                    <Col span={12}>
                    <Modal title="安装依赖包"
                        visible={visible}
                        okText="安装"
                        cancelText="取消"
                        onOk={this.handleInstallOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleInstallCancel}
                        >
                        <p><Input onChange={this.handlerChangePackage} value={packageName} placeholder="输入包名例如：react@16.3.0 或 react" /></p>
                    </Modal>
                        <Card bordered={false} title={`Dependencies(${dependenciesTable.length})`} extra={<Button onClick={this.handlerInstallOnecPkg('--save')} size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div>
                                <Table
                                    size="small"
                                    scroll={{ y: 480 }}
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
                        <Card bordered={false} title={`devDependencies(${devDependenciesTable.length})`} extra={<Button onClick={this.handlerInstallOnecPkg('--save-dev')} size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div>
                                <Table
                                    size="small"
                                    scroll={{ y: 480 }}
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