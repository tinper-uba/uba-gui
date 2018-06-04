/**
 * 创建项目左侧助手类
 */

import React, { Component } from 'react';
import { Row, Col, Divider, List, Avatar } from 'antd';
import {shell} from 'electron';
import pkg from '../../../../package.json';
import bannerPng from 'static/banner.png';
import welcome_tutorials from 'static/welcome_tutorials.png';
import welcome_news from 'static/welcome_news.png';
import welcome_mirror from 'static/welcome_mirror.png';
import welcome_cloud from 'static/welcome_cloud.png';


import './Helper.less';

class Helper extends Component {
    openTinper = () => {
        shell.openExternal('http://tinper.org/');
    }
    openDocument = () => {
        shell.openExternal('https://github.com/tinper-uba');
    }
    openTemplates = () => {
        shell.openExternal('https://github.com/uba-templates');
    }
    openIssues = () => {
        shell.openExternal('https://github.com/tinper-uba/uba-gui/issues');
    }
    render() {
        return (
            <div className="helper-wrap">
                <Row>
                    <Col className="col-center" span={24} >
                        <img className="banner" src={bannerPng} />
                    </Col>
                    <Col className="col-center" span={24} >
                        <div className="title">应用平台开发者工具</div>
                        <div className="version">Version {pkg.version}</div>
                    </Col>
                    <Col span={24} >
                        <List style={{ "padding": "40px 25px","marginTop":"50px" }} itemLayout="horizontal">
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" src={welcome_tutorials} />}
                                    title={<a onClick={this.openTinper} href="javascript:;">发现新特性</a>}
                                    description="来这里看一看有哪些新的特性"
                                />
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" src={welcome_news} />}
                                    title={<a onClick={this.openDocument} href="javascript:;">使用文档</a>}
                                    description="各种功能介绍和文档"
                                />
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" src={welcome_mirror} />}
                                    title={<a onClick={this.openTemplates} href="javascript:;">看看都有哪些新模板?</a>}
                                    description="更多的模板等着你"
                                />
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" src={welcome_cloud} />}
                                    title={<a onClick={this.openIssues} href="javascript:;">问答社区</a>}
                                    description="有任何疑问来这里"
                                />
                            </List.Item>

                        </List>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default Helper;
