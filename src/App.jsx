import React from 'react';
import { Route, Router, NavLink } from 'mirrorx';
import { Layout, Menu, Breadcrumb } from 'antd';
import Head from 'components/Head';
import Routes from './routes';
const { Header, Content, Footer } = Layout;


const App = () => (
  <Router>
    <div>
      <Layout className="layout">
        <Route path='*' component={Head} />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Routes />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        uba ©2018 Created by Kvkens
          </Footer>
      </Layout>
    </div>
  </Router>
)

export default App;