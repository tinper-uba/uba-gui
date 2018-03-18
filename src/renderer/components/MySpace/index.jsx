import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification, message, Layout, List, Avatar, Menu, Icon } from 'antd';
import { ipcRenderer } from 'electron';
import LeftMenu from 'components/LeftMenu';
import Logo from 'components/Logo';
import ut from 'static/ut.png';
import ansiHTML from 'ansi-html';

import './index.less';
const { Header, Content, Footer, Sider } = Layout;


const ipc = ipcRenderer;


//测试用记得删除
ipc.on('uba::view::project2', (event, workSpace) => {
    actions.my.setWorkSpace(workSpace);
});


let prt, ele;
/**
 * 接收构建on消息
 */
ipc.on('uba::run::build::on', (event, log) => {
    // console.log(log)
    actions.my.setCmdLog(ansiHTML(log.toString().replace(/\n/g, '<br>')));
    if (ele.offsetHeight > prt.clientHeight) {
        prt.scrollTop = ele.clientHeight - prt.clientHeight;
    }
});

/**
 * 接收构建end消息
 */
ipc.on('uba::run::build::end', (event, log, code) => {
    // console.log(log,code);
    message.success(log);
});
/**
 * 接收调试on消息
 */
ipc.on('uba::run::dev::on', (event, log,term) => {
    // console.log(log)
    actions.my.setCmdLog(ansiHTML(log.toString().replace(/\n/g, '<br>')));
    if (ele.offsetHeight > prt.clientHeight) {
        prt.scrollTop = ele.clientHeight - prt.clientHeight;
    }
    console.log(term)
});

ipc.on('uba::log', (event, log) => {
    console.log(log)
});

/**
 * 接收构建end消息
 */
ipc.on('uba::run::dev::end', (event, log, code) => {
    // console.log(log,code);
    message.success(log);
});


class MySpace extends Component {
    /**
     * 打开反馈浏览器
     */
    openGithub = () => {
        ipc.send('uba::openUrl', 'https://github.com/tinper-uba/uba-gui/issues');
    }
    /**
     * 执行调试
     */
    npmRun = (item) => () => {
        console.log('发送启动调试消息 uba::run::dev', item.path);
        ipc.send('uba::run::dev', item);
    }
    /**
     * 执行构建
     */
    npmBuild = (item) => () => {
        console.log('发送构建消息 uba::run::build', item.path);
        ipc.send('uba::run::build', item);
    }

    npmStop = (item) => () => {
        ipc.send('uba::run::stop', item);
    }

    /**
     * 打开本地工程
     */
    openLocalFolder = (item) => () => {
        console.log('发送打开本地文件夹消息 uba::open::folder', item.path);
        ipc.send('uba::open::folder', item.path);
    }

    render() {
        let { workSpace, cmdLine } = this.props;
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
                                <Icon onClick={() => { actions.routing.push('init') }} type="plus-circle-o" />
                                <span>新建项目</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon onClick={() => { ipc.send('uba::import') }} type="upload" />
                                <span>导入项目</span>
                            </Menu.Item>
                            {/* <Menu.Item key="3">
                                <Icon type="setting" />
                                <span>设置</span>
                            </Menu.Item> */}
                            <Menu.Item key="4">
                                <Icon onClick={this.openGithub} type="github" />
                                <span>反馈</span>
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
                                    <Button onClick={this.npmRun(item)} >运行</Button>,
                                    <Button onClick={this.npmBuild(item)} >构建</Button>,
                                    <Button onClick={this.npmStop(item)} >停止</Button>
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={ut} />}
                                        title={<a onClick={this.openLocalFolder(item)} href="javascript:void(0)">{item.title}</a>}
                                        description={`Path:${item.path}`}
                                    />
                                </List.Item>
                            )}
                        />
                        <div className="uba-cmd" ref={(item) => { prt = item }}>
                            <div ref={(item) => { ele = item }} dangerouslySetInnerHTML={{ __html: cmdLine }} ></div>
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default MySpace;
