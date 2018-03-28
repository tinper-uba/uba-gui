/**
 * 创建工程、打开历史工程、导入工程
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Tabs, Icon, Button, Col, Row,Tag } from 'antd';
import FengChao from './FengChao';
const TabPane = Tabs.TabPane;

import './CreateProject.less';

class CreateProject extends Component {
    render() {
        let { selectProject } = this.props;
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
                    <Col className="select-item" span={12}>
                        <span>已选择：</span><Tag color="blue">{selectProject.title}</Tag>
                    </Col>
                    <Col span={12}>
                        <Button disabled={!selectProject.repositories} className="btn" type="primary">下一步</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect((state) => state.welcome)(CreateProject);