/**
 * @description React 入口文件
 */

import React from 'react';
import { Route, Router, NavLink } from 'mirrorx';
import { Layout, Menu, Icon } from 'antd';
import { ipcRenderer } from 'electron';
import pkg from '../../package.json';
// import CloseButton from 'components/CloseButton';
import Routes from './routes';
import './App.less';
const { Header, Content, Footer, Sider } = Layout;
const ipc = ipcRenderer;



const App = () => (
  <Router>
    <div>
      <Layout style={{ marginLeft: 0 }}>
      {/* <CloseButton isClose={true} isMin={true} isMax={true} /> */}
        <Content style={{ margin: '0', overflow: 'initial' }}>
          {/* <Header className="titlebar" >
          </Header> */}
          <div style={{ padding: 0, background: '#fff' }}>
            <Routes />
          </div>
        </Content>
      </Layout>
    </div>
  </Router>
)

export default App;