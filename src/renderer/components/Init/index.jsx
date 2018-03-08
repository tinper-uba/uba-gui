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
        let { currStep, repoData, selectName } = this.props;
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
                                <Step title="选择模板" description={selectName.length == 0 ? '请选择下面的开发框架' : `已选：${selectName}`} />
                                <Step title="项目位置" description="设置项目目录." />
                                <Step title="项目安装" description="完成最后安装." />
                            </Steps>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="select-card">
                        {currStep == 0 && <div>
                            {repoData.length != 0 && <ProjectCard data={repoData} />}
                            {repoData.length == 0 && <Icon style={{ fontSize: 36, color: '#62adf3' }} type="loading" />}
                        </div>}
                    </Col>
                </Row>
                <Row style={{ "margin": 0 }}>
                    <Col span={24}>
                        <div className="op">
                            {currStep == 0 && <Button icon="left-circle-o" className="btn" onClick={() => actions.emptyhome.home()} type="primary">上一步</Button>}
                            {currStep == 0 && <Button icon="right-circle-o" className="btn" onClick={() => actions.init.setStep(1)} type="primary">下一步</Button>}
                            {currStep == 1 && <Button icon="left-circle-o" className="btn" onClick={() => actions.init.setStep(0)} type="primary">上一步</Button>}
                            {currStep == 1 && <Button icon="right-circle-o" className="btn" onClick={() => actions.init.setStep(2)} type="primary">下一步</Button>}
                            {currStep == 2 && <Button loading={false} icon="smile-o" className="btn" onClick={() => actions.init.setStep(3)} type="primary">完成</Button>}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Init;
