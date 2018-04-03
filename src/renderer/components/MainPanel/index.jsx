import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'mirrorx';
import Logo from '../Logo';
const { Header, Footer, Sider, Content } = Layout;

import './index.less';

class MainPanel extends Component {
    render() {
        console.log(this.props);
        let { match } = this.props;
        return (
            <Layout className="main-wrap">
                <Header>
                    <div className="main-head">
                        <Logo />
                    </div>
                </Header>
                <Layout>
                    <Sider>
                        Sider
                    </Sider>
                    <Content>
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPanel;
