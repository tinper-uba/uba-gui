import React, { Component } from 'react';
import { Row, Col, Layout, Menu, Button, Icon } from 'antd';
import { ipcRenderer } from 'electron';
import { actions, Switch, Route, Link } from 'mirrorx';
import Logo from '../Logo';
import Gift from './Gift';
import ProjectManage from '../ProjectManage';
import AppDesign from '../AppDesign';
import ResourceMaintenance from '../ResourceMaintenance';
import MockData from '../MockData';
const { Header, Footer, Sider, Content } = Layout;
const ButtonGroup = Button.Group;
const ipc = ipcRenderer;
import './index.less';

//监听resize动态计算Left高
window.addEventListener('resize', () => {
    let innerHeight = 0;
    innerHeight = window.innerHeight - 64;
    actions.main.save({ toolbarHeight: innerHeight });
});

ipc.on('uba::get::config::success::title', (event, obj) => {
    actions.main.save({ title: obj.title });
});

class MainPanel extends Component {
    componentDidMount() {
        let innerHeight = 0;
        innerHeight = window.innerHeight - 64;
        actions.main.save({ toolbarHeight: innerHeight });
        ipc.send('uba::get::config', 'title');
    }
    render() {
        let { match, location, toolbarHeight, title } = this.props;
        return (
            <Layout className="main-wrap">
                <Header style={{ 'borderBottom': '1px solid #ececec' }}>
                    <Row>
                        <Col span={3}>
                            <Logo />
                        </Col>
                        <Col span={15}>
                            <h1 style={{ 'fontWeight': '300' }}>{title}</h1>
                        </Col>
                        <Col span={3} style={{ 'textAlign': 'center' }}>
                            <ButtonGroup>
                                <Button icon="code-o" />
                                <Button icon="edit" />
                                <Button icon="folder-open" />
                            </ButtonGroup>
                        </Col>
                        <Col span={3} style={{ 'textAlign': 'center' }}>
                            <ButtonGroup>
                                <Button icon="message" />
                                <Button icon="github" />
                                <Button icon="question-circle-o" />
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider width={130} collapsed={true}>
                        <Menu selectedKeys={[location.pathname]} style={{ "height": toolbarHeight }} theme='dark' mode="inline">
                            <Menu.Item key="/main/project">
                                <Icon onClick={() => actions.routing.push('/main/project')} className="nav-icon" type="appstore-o" />
                                <span className="nav-item" >项目管理</span>
                            </Menu.Item>
                            <Menu.Item key="/main/design">
                                <Icon onClick={() => actions.routing.push('/main/design')} className="nav-icon" type="flag" />
                                <span className="nav-item">应用设计</span>
                            </Menu.Item>
                            <Menu.Item key="/main/resource">
                                <Icon onClick={() => actions.routing.push('/main/resource')} className="nav-icon" type="folder" />
                                <span className="nav-item">资源维护</span>
                            </Menu.Item>
                            <Menu.Item key="/main/mock">
                                <Icon onClick={() => actions.routing.push('/main/mock')} className="nav-icon" type="api" />
                                <span className="nav-item">Mock数据</span>
                            </Menu.Item>
                        </Menu>
                        <div className="setting-tool">
                            <Menu theme='dark' mode="inline">
                                <Menu.Item key="1">
                                    <Icon type="setting" />
                                    <span>设置</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="question-circle-o" />
                                    <span>疑问</span>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Sider>
                    <Content>
                        <Route path={`${match.url}/welcome`} component={Gift} />
                        <Route path={`${match.url}/project`} component={ProjectManage} />
                        <Route path={`${match.url}/design`} component={AppDesign} />
                        <Route path={`${match.url}/resource`} component={ResourceMaintenance} />
                        <Route path={`${match.url}/mock`} component={MockData} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPanel;
