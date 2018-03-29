/**
 * 欢迎界面
 */

import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import Helper from './Helper';
import CreateProject from './CreateProject';

import './index.less';

const { Header, Footer, Sider, Content } = Layout;

class Welcome extends Component {
    render() {
        return (
            <Layout className="welcome-wrap">
                <Content>
                    <Row>
                        <Col style={{ "background": "#4b4b4b", "height": "608px" }} span={7}>
                            <Helper />
                        </Col>
                        <Col span={17}>
                            <CreateProject />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Welcome;
