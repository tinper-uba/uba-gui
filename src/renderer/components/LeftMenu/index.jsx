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
                <Menu.Item key="/menu5">
                    <NavLink to="/menu5"><Icon type="appstore-o" />演示项目 5</NavLink>
                </Menu.Item>
                <Menu.Item key="/menu6">
                    <NavLink to="/menu6"><Icon type="appstore-o" />演示项目 6</NavLink>
                </Menu.Item>
                <Menu.Item key="/menu7">
                    <NavLink to="/menu7"><Icon type="appstore-o" />演示项目 7</NavLink>
                </Menu.Item>
                <Menu.Item key="/menu8">
                    <NavLink to="/menu8"><Icon type="appstore-o" />演示项目 8</NavLink>
                </Menu.Item>
            </Menu>
        );
    }
}


export default LeftMenu;
