/**
 * @description React 入口文件
 */

import React from 'react';
import { Route, Router, NavLink } from 'mirrorx';
import { Layout, Menu, Icon } from 'antd';
import { ipcRenderer } from 'electron';
import pkg from '../../package.json';
import LeftMenu from 'components/LeftMenu';
import SiderLeft from 'components/SiderLeft';
import Routes from './routes';
import './App.less';
const { Header, Content, Footer, Sider } = Layout;
const ipc = ipcRenderer;



const App = () => (
  <Router>
    <div>
      <Layout style={{ marginLeft: 0 }}>
        <SiderLeft />
        <Content style={{ margin: '0', overflow: 'initial' }}>
          <Header className="titlebar" >
            <div className="version">v{pkg.version}</div>
          </Header>
          <div style={{ padding: 2, background: '#fff' }}>
            <Routes />
          </div>
        </Content>
      </Layout>
    </div>
  </Router>
)

export default App;