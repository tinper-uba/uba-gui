import React from 'react';
import { Route, Router, NavLink } from 'mirrorx';
import { Layout, Menu, Icon } from 'antd';
import LeftMenu from 'components/LeftMenu';
import Routes from './routes';
import './App.less';
const { Header, Content, Footer, Sider } = Layout;
const remote = require('electron').remote;

console.log(remote);

const App = () => (
  <Router>
    <div>
      <Layout>
        <Sider style={{ background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo"></div>
          <Route path="*" component={LeftMenu} />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className="titlebar" >
            v1.0.0
          </Header>
          <Content style={{ margin: '0', overflow: 'initial' }}>
            <div style={{ padding: 10, background: '#fff' }}>
              <Route exact path="/" render={() => (<div>home</div>)} />
              <Route exact path="/menu2" render={() => (<div>menu2</div>)} />
              <Route exact path="/menu3" render={() => (<div>menu3</div>)} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  </Router>
)

export default App;