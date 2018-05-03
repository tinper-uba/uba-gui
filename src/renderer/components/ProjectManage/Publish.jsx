import React, { Component } from 'react';
import { Row, Col, Button, Input, Form, Icon, Select } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer } from 'electron';
import util from 'common';

import './Publish.less';

const ipc = ipcRenderer;
const FormItem = Form.Item;
const Option = Select.Option;

class Publish extends Component {
    constructor(){
        super();
        this.state = {
            loading : false
        }
    }
    componentDidMount() {
        console.log(this.props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    loading : true
                });
            }
        });
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 6 }
            }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="publish-wrap">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="发布类型"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择发布类型服务' }],
                            initialValue: 'SSH'
                        })(
                            <Select placeholder="请选择发布类型">
                                <Option value="SSH">SSH</Option>
                                <Option value="FTP">FTP</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="发布地址"
                    >
                        {getFieldDecorator('address', {
                            rules: [{
                                type: 'string', message: '请输入发布服务器地址',
                            }, {
                                required: true, message: '服务器地址不能为空',
                            }],
                        })(
                            <Input placeholder="请输入发布服务器地址" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="发布路径"
                    >
                        {getFieldDecorator('path', {
                            rules: [{
                                type: 'string', message: '请输入服务器路径',
                            }, {
                                required: true, message: '服务器路径不能为空',
                            }],
                        })(
                            <Input placeholder="请输入发布服务器路径" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="登录名"
                    >
                        {getFieldDecorator('login', {
                            rules: [{
                                type: 'string', message: '请输入登录名',
                            }, {
                                required: true, message: '登录名不能为空',
                            }],
                        })(
                            <Input placeholder="请输入登录名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                type: 'string', message: '请输入密码',
                            }, {
                                required: true, message: '密码不能为空',
                            }],
                        })(
                            <Input type="password" placeholder="请输入密码" />
                        )}
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 4, offset: 8 }}
                    >
                        <Button loading={this.state.loading} icon="rocket" type="primary" htmlType="submit">发&nbsp;布</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedPublishForm = Form.create()(Publish);
export default connect((state) => state.main)(WrappedPublishForm);