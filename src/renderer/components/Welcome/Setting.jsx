/**
 * @description 设置
 */

import React, { Component } from 'react';
import { Steps, Icon, Row, Col, Select, Form, Input, Switch, Button } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, remote } from 'electron';
import path from 'path';
import Waiting from '../Waiting';
import './Setting.less';

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;
const ipc = ipcRenderer;

let setFieldsValue;
let installTimer, countTimer = 0;
//选择路径后设置路径值
ipc.on('uba::openProject::success', (event, path) => {
    setFieldsValue({
        projectPath: path
    });
});
//接收下载远端脚手架成功
ipc.on('uba::init::success', (event, workSpace) => {
    actions.welcome.setHistoryProject(workSpace);
    console.log('uba::init::success', workSpace);
    countTimer = 100;
    clearInterval(installTimer);
    let state = actions.welcome.setUpdateProcessState({
        isFinish: true,
        percent: countTimer,
        processMsg: `脚手架下载成功`,
    });
    //判断是否自动安装npminstall
    if (state.npmInstall) {
        ipc.send('uba::install', actions.welcome.getInitParams());
        countTimer = 0;
        installTimer = setInterval(() => {
            countTimer++;
            if (countTimer > 95) {
                clearInterval(installTimer);
            }
            actions.welcome.setUpdateProcessState({
                isFinish: false,
                percent: countTimer,
                processMsg: `正在安装依赖包请稍等`,
            });
        }, 1000);
    }
});
//uba::install::success
ipc.on('uba::install::success', () => {
    countTimer = 100;
    clearInterval(installTimer);
    let state = actions.welcome.setUpdateProcessState({
        isFinish: true,
        percent: countTimer,
        processMsg: `所有安装已经完毕`,
    });
});
//
//接收下载远端脚手架失败
ipc.on('uba::init::error', (event) => {
    console.log('uba::init::error')
});

ipc.on('uba::install::error', (event, err) => {
    console.log('uba::install::error', err)
});


class Setting extends Component {
    //安装
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                //写入设置信息
                actions.welcome.setSetting(values);
                //获得安装信息
                let params = actions.welcome.getInitParams();
                //发送IPC执行安装
                ipc.send('uba::init', params);
                //切换组件到等待
                actions.welcome.setInitStep(2);

                //启动进度条
                clearInterval(installTimer);
                installTimer = setInterval(() => {
                    countTimer++;
                    if (countTimer > 95) {
                        clearInterval(installTimer);
                    }
                    actions.welcome.setUpdateProcessState({
                        isFinish: false,
                        percent: countTimer,
                        processMsg: `正在下载【${params.title}】脚手架请稍等`,
                    });
                }, 1000);

            }
        });
    }
    //选择保存位置dialog
    handlerPath = () => {
        ipc.send('uba::openProject');
    }
    //安装完成
    handlerFinish = () => {
        // actions.welcome.save({
        //     projectName: item.projectName,
        //     projectPath: item.projectPath,
        //     repositories: item.repositories,
        //     organization: item.organization,
        //     registry: item.registry
        // });
        ipc.send('uba::set::config',{
            runProject : path.join(this.props.projectPath,this.props.projectName),
            title:this.props.title
        });
        actions.welcome.finish();
    }
    render() {
        let { initStep, setting, title, projectPath, registry, processMsg, percent, isFinish } = this.props;
        const { getFieldDecorator } = this.props.form;
        setFieldsValue = this.props.form.setFieldsValue;
        return (<div className="setting-wrap">
            <Row className="steps-init">
                <Col span={3}></Col>
                <Col span={18}>
                    <Steps current={initStep - 1}>
                        <Step title="设置" icon={<Icon type="setting" />} description="设置对项目的一些配置信息." />
                        <Step title="安装" icon={<Icon type="bars" />} description="处理一些安装信息等." />
                    </Steps>
                </Col>
                <Col span={3}></Col>
            </Row>
            <Row className="init-form">
                <Col span={24}>
                    {initStep == 1 && <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="脚手架名称"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '项目名称不能为空' }],
                                initialValue: title
                            })(
                                <Input disabled placeholder='请选择脚手架名称' prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </FormItem>
                        <FormItem
                            label="项目名称"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('projectName', {
                                rules: [{ required: true, message: '项目名称不能为空' }]
                            })(
                                <Input placeholder='请输入您的项目名' prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </FormItem>
                        <FormItem
                            label="存储位置"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('projectPath', {
                                rules: [{ required: true, message: '请选择本地开发目录' }],
                                initialValue: projectPath
                            })(
                                <Input disabled placeholder='请选择本地开发目录' addonAfter={<Icon onClick={this.handlerPath} type="folder-open" />} prefix={<Icon type="setting" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </FormItem>
                        <FormItem
                            label="初始化依赖"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('npmInstall', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
                            )}
                        </FormItem>
                        <FormItem
                            label="npm镜像源"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                        >
                            {getFieldDecorator('registry', {
                                rules: [{ required: true, message: '请选择npm加速镜像' }],
                                initialValue: registry
                            })(
                                <Select placeholder="请选择镜像源">
                                    <Option value="https://registry.npm.taobao.org">https://registry.npm.taobao.org</Option>
                                    <Option value="https://registry.npmjs.org">https://registry.npmjs.org</Option>
                                    <Option value="http://172.16.75.107:8081/repository/ynpm-group/">用友集团内网</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>}
                    {
                        initStep == 2 && <Waiting processMsg={processMsg} percent={percent} />
                    }
                </Col>
            </Row>
            <Row className="opeate">
                {initStep == 1 && <Col span={24}>
                    <div className="setting-btn">
                        <Button icon="left-square-o" onClick={() => { actions.welcome.setInitStep(0) }} >返回</Button>
                    </div>
                    <div className="setting-btn">
                        <Button icon="right-square-o" onClick={this.handleSubmit} style={{ "marginRight": "10px" }} type="primary">安装</Button>
                    </div>
                </Col>}
                {
                    initStep == 2 && <Col span={24}>
                        <div className="setting-btn">
                            <Button onClick={this.handlerFinish} loading={!isFinish} icon="right-square-o" style={{ "marginRight": "10px" }} type="primary">{isFinish ? '完成' : '等待'}</Button>
                        </div>
                    </Col>
                }
            </Row>
        </div>
        );
    }
}

export default connect((state) => state.welcome)(Form.create()(Setting));