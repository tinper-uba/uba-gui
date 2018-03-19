import React from 'react';
import { Route, Router, NavLink } from 'mirrorx';
import {remote} from 'electron';
import { Layout, Menu, Icon } from 'antd';
import { ipcRenderer } from 'electron';
import pkg from '../../package.json';
import LeftMenu from 'components/LeftMenu';
import Logo from 'components/Logo';
import Routes from './routes';
import './App.less';
const { Header, Content, Footer, Sider } = Layout;
const ipc = ipcRenderer;
const win = remote.getGlobal('win');

const closeHandler = () => {
  win.hide();
}
const minHandler = () => {
  win.minimize();
}
const maxHandler = () => {
  win.maximize()
}


const App = () => (
  <Router>
    <div>
      <Layout style={{ marginLeft: 0 }}>
        <Header className="titlebar" >
          <div className="toolbar">
            <span onClick={closeHandler} className="btn close"></span>
            <span onClick={minHandler} className="btn min"></span>
            <span onClick={maxHandler} className="btn max"></span>
          </div>
          <div className="version">v{pkg.version}</div>
        </Header>
        <Content style={{ margin: '0', overflow: 'initial' }}>
          <div style={{ padding: 2, background: '#fff' }}>
            <Routes />
          </div>
        </Content>
      </Layout>
    </div>
  </Router>
)

export default App;