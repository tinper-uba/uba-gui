import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification, message, Layout, List, Avatar, Menu, Icon } from 'antd';
import { ipcRenderer } from 'electron';
import LeftMenu from 'components/LeftMenu';
import Logo from 'components/Logo';
import ut from 'static/ut.png';

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
                    <Sider
                        trigger={null}
                        collapsible
                        defaultCollapsed={true}
                        collapsed={true}
                        style={{ "marginRight": "3px" }}
                    >
                        <Logo />
                        <Menu
                            style={{
                                "position": "absolute",
                                "bottom": 0
                            }}
                            theme="light"
                            mode="inline">
                            <Menu.Item key="1">
                                <Icon type="plus-circle-o" />
                                <span>新建项目</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="upload" />
                                <span>导入项目</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="setting" />
                                <span>设置</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="github" />
                                <span>Github</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ "background": "#fff" }}>
                        <List
                            className="uba-project-list"
                            itemLayout="horizontal"
                            bordered={true}
                            dataSource={workSpace}
                            renderItem={item => (
                                <List.Item actions={[
                                    <Button type="primary">运行</Button>,
                                    <Button type="primary">构建</Button>,
                                    <Button type="danger">删除</Button>
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={ut} />}
                                        title={item.title}
                                        description={`Path:${item.path}`}
                                    />
                                </List.Item>
                            )}
                        />
                        <div className="uba-cmd">
                            [2018-2-4 0:26:35] 开始检测uba本地配置文件<br />
                            [2018-2-4 0:26:35] 配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project<br />
                            [2018-2-4 0:33:3] 开始检测uba本地配置文件<br />
                            [2018-2-4 0:33:3] 配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project<br />
                            [2018-2-4 0:26:35] 开始检测uba本地配置文件<br />
                            [2018-2-4 0:26:35] 配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project<br />
                            [2018-2-4 0:33:3] 开始检测uba本地配置文件<br />
                            [2018-2-4 0:33:3] 配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project<br />
                            [2018-2-4 0:26:35] 开始检测uba本地配置文件<br />
                            [2018-2-4 0:26:35] 配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project<br />
                            [2018-2-4 0:33:3] 开始检测uba本地配置文件<br />
                            [2018-2-4 0:33:3] 配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project<br />
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default MySpace;
