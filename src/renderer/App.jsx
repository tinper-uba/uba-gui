import React from 'react';
import { Route, Router, NavLink } from 'mirrorx';
import { Layout, Menu, Icon } from 'antd';
import { ipcRenderer } from 'electron';
import pkg from '../../package.json';
import LeftMenu from 'components/LeftMenu';
import Logo from 'components/Logo';
import Routes from './routes';
import './App.less';
const { Header, Content, Footer, Sider } = Layout;
const ipc = ipcRenderer;

const App = () => (
  <Router>
    <div>
      <Layout style={{ marginLeft: 0 }}>
        <Header className="titlebar" >
          v{pkg.version}
        </Header>
        <Content style={{ margin: '0', overflow: 'initial' }}>
          <div style={{ padding: 10, background: '#fff' }}>
            <Routes />
          </div>
        </Content>
      </Layout>
    </div>
  </Router>
)

export default App;