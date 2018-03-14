import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification, message,Layout } from 'antd';
import { ipcRenderer } from 'electron';
import LeftMenu from 'components/LeftMenu';
import Logo from 'components/Logo';

import './index.less';
const { Header, Content, Footer, Sider } = Layout;


const ipc = ipcRenderer;

// ipc.on('MySpace', (event, data) => {
//     console.log(data);
// });
//测试用记得删除
ipc.on('uba::view::project2', (event, workSpace) => {
    actions.my.setWorkSpace(workSpace);
});


class MySpace extends Component {
    openHomePage = () => {
        ipc.send('uba::openUrl', 'http://tinper.org');
    }
    render() {
        let { workSpace } = this.props;
        return (
            <div className="uba-my-space">
                <Layout>
                    <Sider>
                        <Logo />
                        <LeftMenu sourceData={workSpace} />
                    </Sider>
                    <Content>
                        内容
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default MySpace;
