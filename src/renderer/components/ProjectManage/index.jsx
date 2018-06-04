import React, { Component } from 'react';
import { Tabs, Row, Col } from 'antd';
import Empty from 'components/Empty';
import ServiceManage from './ServiceManage';
import BuildRes from './BuildRes';
import ProxySetting from './ProxySetting';
// import DependManage from './DependManage';
import Publish from './Publish';


const TabPane = Tabs.TabPane;

import './index.less';

class ProjectManage extends Component {
    render() {
        return (<div className="project-wrap">
            <Row>
                <Col span={24}>
                    <Tabs style={{ 'minHeight': '280px' }} defaultActiveKey="1">
                        <TabPane tab="服务管理" key="1">
                            <ServiceManage />
                        </TabPane>
                        <TabPane tab="构建资源" key="2">
                            <BuildRes />
                        </TabPane>
                        <TabPane tab="代理设置" key="3">
                            <ProxySetting />
                        </TabPane>
                        <TabPane tab="测试质量" key="4">
                            <Empty title="测试质量" />
                        </TabPane>
                        <TabPane tab="发布集成" key="5">
                            <Publish />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            {/* <Row>
                <Col span={24}>
                    <DependManage />
                </Col>
            </Row> */}
        </div>);
    }
}

export default ProjectManage;
