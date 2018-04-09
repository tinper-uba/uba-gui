import React, { Component } from 'react';
import { Row, Col, Layout, Menu, Icon } from 'antd';
import { actions, Switch, Route } from 'mirrorx';
import Logo from '../Logo';
import Gift from './Gift';
const { Header, Footer, Sider, Content } = Layout;

import './index.less';


window.addEventListener('resize', () => {
    let innerHeight = 0;
    innerHeight = window.innerHeight - 64;
    actions.main.save({ toolbarHeight: innerHeight });
});
class MainPanel extends Component {
    componentDidMount() {
        let innerHeight = 0;
        innerHeight = window.innerHeight - 64;
        actions.main.save({ toolbarHeight: innerHeight });
    }
    render() {
        let { match, toolbarHeight } = this.props;
        return (
            <Layout className="main-wrap">
                <Header>
                    <Row>
                        <Col span={6}>
                            <Logo />
                        </Col>
                        <Col span={14}>
                            14
                        </Col>
                        <Col span={4}>
                            4
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider width={130} collapsed={false}>
                        <Menu style={{ "height": toolbarHeight }} theme='dark' mode="inline">
                            <Menu.Item key="1">
                                <Icon type="appstore-o" />
                                <span className="nav-text">项目管理</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="flag" />
                                <span className="nav-text">应用设计</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="folder" />
                                <span className="nav-text">资源维护</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="api" />
                                <span className="nav-text">Mock数据</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <Gift />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPanel;
