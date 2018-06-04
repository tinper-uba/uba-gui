import React, { Component } from 'react';
import { Row, Col, Layout, Menu, Button, Icon } from 'antd';
import { ipcRenderer, shell } from 'electron';
import path from 'path';
import { actions, Switch, Route, Link } from 'mirrorx';
import Logo from '../Logo';
import Gift from './Gift';
import Editor from '../Editor';
import ProjectManage from '../ProjectManage';
import AppDesign from '../AppDesign';
import ResourceMaintenance from '../ResourceMaintenance';
// import MockData from '../MockData';
import MockYonyou from '../MockData/MockYonyou';
import Setting from 'containers/Setting';
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
                                <Button onClick={() => shell.showItemInFolder(`${path.join(this.props.runProject, 'package.json')}`)} icon="folder-open" />
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
                    <Sider width={70} collapsed={false}>
                        <Menu selectedKeys={[location.pathname]} style={{ "height": toolbarHeight }} theme='dark' mode="inline">
                            <Menu.Item className="menu-item" key="/main/editor">
                                <div>
                                    <Icon onClick={() => actions.routing.push('/main/editor')} className="nav-icon" type="appstore-o" />
                                </div>
                                <div>
                                    <span onClick={() => actions.routing.push('/main/editor')} className="nav-item">项目</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item className="menu-item" key="/main/project">
                                <div>
                                    <Icon onClick={() => actions.routing.push('/main/project')} className="nav-icon" type="fork" />
                                </div>
                                <div>
                                    <span onClick={() => actions.routing.push('/main/project')} className="nav-item">流程</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item className="menu-item" key="/main/design">
                                <div>
                                    <Icon onClick={() => actions.routing.push('/main/design')} className="nav-icon" type="shop" />
                                </div>
                                <div>
                                    <span onClick={() => actions.routing.push('/main/design')} className="nav-item">小应用</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item className="menu-item" key="/main/resource">
                                <div>
                                    <Icon onClick={() => actions.routing.push('/main/resource')} className="nav-icon" type="folder" />
                                </div>
                                <div>
                                    <span onClick={() => actions.routing.push('/main/resource')} className="nav-item">资源</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item className="menu-item" key="/main/mock">
                                <div>
                                    <Icon onClick={() => actions.routing.push('/main/mock')} className="nav-icon" type="api" />
                                </div>
                                <div>
                                    <span onClick={() => actions.routing.push('/main/mock')} className="nav-item">数据</span>
                                </div>
                            </Menu.Item>
                        </Menu>
                        <div className="setting-tool">
                            <Menu selectedKeys={[location.pathname]} theme='dark' mode="inline">
                                <Menu.Item key="/main/setting">
                                    <Icon onClick={() => actions.routing.push('/main/setting')} style={{ 'fontSize': '24px' }} type="setting" />
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon style={{ 'fontSize': '22px' }} type="question-circle" />
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Sider>
                    <Content>
                        <Route path={`${match.url}/welcome`} component={Gift} />
                        <Route path={`${match.url}/editor`} component={Editor} />
                        <Route path={`${match.url}/project`} component={ProjectManage} />
                        <Route path={`${match.url}/design`} component={AppDesign} />
                        <Route path={`${match.url}/resource`} component={ResourceMaintenance} />
                        <Route path={`${match.url}/mock`} component={MockYonyou} />
                        <Route path={`${match.url}/setting`} component={Setting} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPanel;
