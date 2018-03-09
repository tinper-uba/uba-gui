import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, Row, Col, Steps, Icon, Card, Form, Input,Select } from 'antd';
import { ipcRenderer } from 'electron';
import ProjectCard from './ProjectCard';
import './index.less';

const ipc = ipcRenderer;
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

let myfrm;

ipc.on('uba::openProject::success', (event, path) => {
    // actions.init.setUpload(path);
    myfrm.setFieldsValue({
        upload: path
    });
});

class Init extends Component {
    checkForm = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                actions.init.setSetting(values);
            }
        });
    }
    handlerUpload = () => {
        ipc.send('uba::openProject', 'http://tinper.org');
    }
    render() {
        
        const { getFieldDecorator } = this.props.form;
        myfrm = this.props.form;
        let { currStep, repoData, selectName,upload } = this.props;
        return (
            <div className="uba-init">
                <Row>
                    <Col span={24}>
                        <span className="new-project">创建新项目</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="step-process">
                            <Steps current={currStep}>
                                <Step title="选择模板" description={selectName.length == 0 ? '请选择下面的开发框架' : `${selectName}`} />
                                <Step title="项目位置" description="设置项目信息." />
                                <Step title="项目安装" description="完成最后安装." />
                            </Steps>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="select-card">
                        {currStep == 0 && <div style={{ 'textAlign': 'center' }}>
                            {repoData.length != 0 && <ProjectCard data={repoData} />}
                            {repoData.length == 0 && <Icon style={{ fontSize: 36, color: '#62adf3', marginTop: '100px' }} type="loading" />}
                        </div>}
                        {
                            currStep == 1 && <Form>
                                <FormItem
                                    label="项目名"
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('project', {
                                        rules: [{ required: true, message: '项目名称不能为空' }],
                                    })(
                                        <Input placeholder='请输入您的项目名' prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="项目路径"
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('upload', {
                                        values:upload,
                                        rules: [{ required: true, message: '请选择本地开发目录' }],
                                    })(
                                        <Input disabled placeholder='请选择本地开发目录' addonAfter={<Icon onClick={this.handlerUpload} type="folder-open" />} prefix={<Icon type="setting" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="镜像源"
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {getFieldDecorator('registry', {
                                        initialValue : 'http://registry.npm.taobao.org',
                                        rules: [{ required: true, message: '请选择npm加速镜像' }],
                                    })(
                                        <Select placeholder="请选择镜像源">
                                            <Option value="http://registry.npm.taobao.org">http://registry.npm.taobao.org</Option>
                                            <Option value="http://registry.npmjs.org/">http://registry.npmjs.org</Option>
                                            <Option value="http://npm.yonyoucloud.com/">用友内网</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Form>
                        }
                    </Col>
                </Row>
                <Row style={{ "margin": 0 }}>
                    <Col span={24}>
                        <div className="op">
                            {currStep == 0 && <Button icon="left-circle-o" className="btn" onClick={() => actions.emptyhome.home()} type="primary">上一步</Button>}
                            {currStep == 0 && <Button disabled={!selectName} icon="right-circle-o" className="btn" onClick={() => actions.init.setStep(1)} type="primary">下一步</Button>}
                            {currStep == 1 && <Button icon="left-circle-o" className="btn" onClick={() => actions.init.setStep(0)} type="primary">上一步</Button>}
                            {currStep == 1 && <Button icon="right-circle-o" className="btn" onClick={this.checkForm} type="primary">下一步</Button>}
                            {currStep == 2 && <Button loading={false} className="btn" onClick={() => actions.init.setStep(3)} type="success">完成</Button>}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(Init);
