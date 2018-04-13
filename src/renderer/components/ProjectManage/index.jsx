import React, { Component } from 'react';
import { Tabs } from 'antd';
import ServiceManage from './ServiceManage';

const TabPane = Tabs.TabPane;

import './index.less';

class ProjectManage extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="服务管理" key="1">
                    <ServiceManage />
                </TabPane>
                <TabPane tab="构建资源" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="测试质量" key="3">Content of Tab Pane 3</TabPane>
                <TabPane tab="发布集成" key="4">Content of Tab Pane 4</TabPane>
            </Tabs>
        );
    }
}

export default ProjectManage;
