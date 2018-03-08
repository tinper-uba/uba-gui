import React, { Component } from 'react';
import { Form, Select, Input, Button,Icon } from 'antd';

import './Setting.less';

const FormItem = Form.Item;
const Option = Select.Option;

class Setting extends Component {
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <FormItem
                    label="工程名"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('project', {
                        rules: [{ required: true, message: '工作区名称不能为空' }],
                    })(
                        <Input placeholder='请输入您的工作区工程名' prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    )}
                </FormItem>
                <FormItem
                    label="项目路径"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('upload', {
                        rules: [{ required: true, message: '请选择本地开发目录' }],
                    })(
                        <Input disabled placeholder='请选择本地开发目录' addonAfter={<Icon onClick={this.handleSubmit} type="folder-open" />} prefix={<Icon type="setting" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(Setting);
