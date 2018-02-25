import React from "react";
import { Route, Router, NavLink } from 'mirrorx';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header } = Layout;


const Head = ({ location }) => (
    <div>
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="/"><NavLink to="/">首页</NavLink></Menu.Item>
                <Menu.Item key="/user"><NavLink to="/user">用户</NavLink></Menu.Item>
                <Menu.Item key="/admin"><NavLink to="/admin">管理</NavLink></Menu.Item>
                <Menu.Item key="/demo1"><NavLink to="/demo1">管理1</NavLink></Menu.Item>
                <Menu.Item key="/demo2"><NavLink to="/demo2">管理2</NavLink></Menu.Item>
                <Menu.Item key="/demo3"><NavLink to="/demo3">管理3</NavLink></Menu.Item>
                
            </Menu>
        </Header>
    </div>
);

export default Head;