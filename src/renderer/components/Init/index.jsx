import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, Row, Col, Steps, Icon, Card } from 'antd';
import { ipcRenderer } from 'electron';
import ProjectCard from './ProjectCard';
import './index.less';

const ipc = ipcRenderer;
const Step = Steps.Step;

class Init extends Component {
    render() {
        let { currStep, repoData } = this.props;
        return (
            <div className="uba-init">
                <Row>
                    <Col span={24}>
                        <span className="new-project">创建新项目</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="step-process">
                            <Steps current={currStep}>
                                <Step title="选择模板" description="选择开发框架." />
                                <Step title="项目位置" description="设置项目目录." />
                                <Step title="项目安装" description="完成最后安装." />
                            </Steps>
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    <Col span={24}>
                        <div className="btn-next">
                            <Button onClick={() => actions.init.setStep()} type="primary">Primary</Button>
                        </div>
                    </Col>
                </Row> */}
                <Row>
                    <Col span={24}>
                        <div className="select-card">
                            {repoData.length != 0 && <ProjectCard data={repoData} />}
                            {repoData.length == 0 && <Icon style={{ fontSize: 36, color: '#62adf3' }} type="loading" />}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Init;
