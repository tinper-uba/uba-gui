/**
 * 创建工程、打开历史工程、导入工程
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Tabs, Icon, Button, Col, Row, Tag } from 'antd';
import HistoryProject from './HistoryProject';
import FengChao from './FengChao';
const TabPane = Tabs.TabPane;

import './CreateProject.less';

class CreateProject extends Component {
    render() {
        let { title,repositories } = this.props;
        return (
            <div className="create-project-wrap">
                <Row className="tabs-center tabs-padding">
                    <Col span={24}>
                        <Tabs defaultActiveKey="2">
                            <TabPane className="tabs-left" tab={<span><Icon type="folder-open" />打开最近项目</span>} key="1">
                                <HistoryProject />
                            </TabPane>
                            <TabPane className="tabs-left" tab={<span><Icon type="profile" />创建新项目</span>} key="2">
                                <FengChao />
                                <Row>
                                    <Col className="select-item" span={12}>
                                        <span>已选择：</span><Tag color="blue">{title}</Tag>
                                    </Col>
                                    <Col className="tabs-right" span={12}>
                                        <Button icon="check-square-o" onClick={() => { actions.welcome.setInitStep(1) }} disabled={!repositories} className="btn" type="primary">选择</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect((state) => state.welcome)(CreateProject);