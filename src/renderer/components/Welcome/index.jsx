/**
 * @description 欢迎界面&选择脚手架设置
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Layout, Row, Col } from 'antd';
import { ipcRenderer } from 'electron';
import Helper from './Helper';
import CreateProject from './CreateProject';
import Setting from './Setting';

import './index.less';

const ipc = ipcRenderer;
const { Header, Footer, Sider, Content } = Layout;

/**
 * 接收服务端当前运行npm镜像检测
 */
ipc.on('uba::checkNpm::success', (event, msg) => {
    if (msg) {
        actions.welcome.changeYonyouNpm();
    }
});

class Welcome extends Component {
    render() {
        let { initStep } = this.props;
        return (
            <Layout className="welcome-wrap">
                <Content>
                    <Row>
                        <Col style={{ "background": "#4b4b4b", "height": "608px" }} span={7}>
                            <Helper />
                        </Col>
                        <Col span={17}>
                            {initStep == 0 && <CreateProject />}
                            {(initStep == 1 || initStep == 2) && <Setting />}
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Welcome;
