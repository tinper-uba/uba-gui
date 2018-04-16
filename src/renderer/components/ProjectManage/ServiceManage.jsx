import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer } from 'electron';
import ansiHTML from 'ansi-html';
import Console from './Console';
import './ServiceManage.less';

var Convert = require('ansi-to-html');
var convert = new Convert();

let runProject;

const ipc = ipcRenderer;
const ButtonGroup = Button.Group;

ipc.on('uba::get::config::success::runProject', (event, obj) => {
    actions.main.save({ runProject: obj['runProject'] });
    runProject = obj['runProject'];
});

ipc.on('uba::run::dev::on', (event, log) => {
    actions.main.addLog(convert.toHtml(log.replace(/\n/g, '<br>')));
});

class ServiceManage extends Component {
    componentDidMount() {
        // console.log(this.props);
        ipc.send('uba::get::config', 'runProject');
    }
    handlerRunDev = () => {
        console.log('handlerRunDev');
        ipc.send('uba::run::dev', {
            path: runProject
        });
        actions.main.save({ devBtnLoading: true });
    }
    handlerRunBuild = () => {
        console.log('handlerRunBuild')
    }
    handlerClearLog = () => {
        console.log('clean log');
    }
    render() {
        let { devLog, toolbarHeight, devBtnLoading, devBtnState, buildBtnState, buildBtnLoading } = this.props;
        return (
            <Row className="service-wrap">
                <Col span={24}>
                    <ButtonGroup className="opeate-tool">
                        <Button onClick={this.handlerRunDev} icon="rocket" disabled={devBtnState} loading={devBtnLoading} >启&nbsp;动</Button>
                        <Button onClick={this.handlerRunBuild} icon="close-circle-o" disabled={buildBtnState} loading={buildBtnLoading}>停&nbsp;止</Button>
                        <Button onClick={this.handlerClearLog} icon="delete" >清&nbsp;空</Button>
                    </ButtonGroup>
                </Col>
                <Col style={{ 'padding': '10px' }} span={24}>
                    <Console height={`${toolbarHeight - 120}`} inner={devLog.join('')} />
                </Col>
            </Row>
        );
    }
}

export default connect((state) => state.main)(ServiceManage);
