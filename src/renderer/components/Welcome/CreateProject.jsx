/**
 * 创建工程、打开历史工程、导入工程
 */

import React, { Component } from 'react';
import { Tabs, Icon, Button, Col, Row } from 'antd';
import FengChao from './FengChao';
const TabPane = Tabs.TabPane;

import './CreateProject.less';

class CreateProject extends Component {
    render() {
        return (
            <div className="create-project-wrap">
                <Row className="tabs-center tabs-padding">
                    <Col span={24}>
                        <Tabs defaultActiveKey="2">
                            <TabPane className="tabs-left" tab={<span><Icon type="folder-open" />打开最近项目</span>} key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane className="tabs-left" tab={<span><Icon type="profile" />创建新项目</span>} key="2">
                                <FengChao />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <Row className="tabs-right">
                    <Col>
                        <Button disabled className="btn" type="primary">下一步</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateProject;
