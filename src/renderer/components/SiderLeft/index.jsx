import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { actions } from 'mirrorx';
import { remote, ipcRenderer } from 'electron';

import './index.less';

const { Header, Content, Footer, Sider } = Layout;
const win = remote.getGlobal('win');
const ipc = ipcRenderer;

const closeHandler = () => {
    win.hide();
}
const minHandler = () => {
    win.minimize();
}
const maxHandler = () => {
    win.maximize();
}

const openGithub = () => {
    ipc.send('uba::openUrl', 'https://github.com/tinper-uba/uba-gui/issues');
}

class SiderLeft extends Component {
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                defaultCollapsed={true}
                collapsed={true}
                className="silder-left"
            >
                <div className="toolbar">
                    <span title="关闭" onClick={closeHandler} className="btn close"></span>
                    <span title="最小化" onClick={minHandler} className="btn min"></span>
                    <span title="最大化" onClick={maxHandler} className="btn max"></span>
                </div>
                {/* <Logo /> */}
                <Menu
                    className="silder-left-menu"
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
                        <Icon onClick={openGithub} type="github" />
                        <span>反馈</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default SiderLeft;
