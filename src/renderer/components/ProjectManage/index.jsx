import React, { Component } from 'react';
import { Tabs } from 'antd';
import Empty from 'components/Empty';
import ServiceManage from './ServiceManage';
import BuildRes from './BuildRes';


const TabPane = Tabs.TabPane;

import './index.less';

class ProjectManage extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="服务管理" key="1">
                    <ServiceManage />
                </TabPane>
                <TabPane tab="构建资源" key="2">
                    <BuildRes />
                </TabPane>
                <TabPane tab="依赖管理" key="5">
                    <Empty title="依赖管理" />
                </TabPane>
                <TabPane tab="测试质量" key="3">
                    <Empty title="测试质量" />
                </TabPane>
                <TabPane tab="发布集成" key="4">
                    <Empty title="发布集成" />
                </TabPane>
            </Tabs>
        );
    }
}

export default ProjectManage;
