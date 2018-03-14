import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification, message, Layout,List, Avatar } from 'antd';
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
                    <Content style={{"background":"#fff"}}>
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
