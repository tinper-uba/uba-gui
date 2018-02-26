import React, { Component } from 'react';
import {NavLink} from 'mirrorx';
import { Menu, Icon } from 'antd';

class LeftMenu extends Component {
    render() {
        let {location} = this.props;
        return (
            <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/">
                    <NavLink to="/"><Icon type="appstore-o" />演示项目 1</NavLink>
                </Menu.Item>
                <Menu.Item key="/menu2">
                    <NavLink to="/menu2"><Icon type="appstore-o" />演示项目 2</NavLink>
                </Menu.Item>
                <Menu.Item key="/menu3">
                    <NavLink to="/menu3"><Icon type="appstore-o" />演示项目 3</NavLink>
                </Menu.Item>
                <Menu.Item key="/menu4">
                    <NavLink to="/menu4"><Icon type="appstore-o" />演示项目 4</NavLink>
                </Menu.Item>
            </Menu>
        );
    }
}


export default LeftMenu;
