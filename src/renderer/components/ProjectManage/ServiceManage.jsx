import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer } from 'electron';
import Convert from 'ansi-to-html';
import util from 'common';
import Console from './Console';
import './ServiceManage.less';

let convert = new Convert();

let runProject;

const ipc = ipcRenderer;
const ButtonGroup = Button.Group;

ipc.on('uba::get::config::success::runProject', (event, obj) => {
    actions.main.save({ runProject: obj['runProject'] });
    runProject = obj['runProject'];
});
//调试服务日志
ipc.on('uba::run::dev::on', (event, log) => {
    actions.main.addLog(convert.toHtml(log.replace(/\n/g, '<br>')));
});
//调试服务正常停止
ipc.on('uba::run::stop::success', (event) => {
    console.log('exit success');
    actions.main.addLog(`[${util.getNowDate()}] 调试服务已关闭</br>`);
    actions.main.save({
        devBtnLoading: false,
        stopBtnState: true,
        stopBtnLoading: false
    });
});
//调试服务正常停止
ipc.on('uba::run::stop::error', (event,errLog) => {
    console.log('exit error');
    actions.main.addLog(convert.toHtml(errLog.replace(/\n/g, '<br>')));
    actions.main.addLog(`[${util.getNowDate()}] 内部启动发生严重错误，请检查项目配置错误信息</br>`);
    actions.main.save({
        devBtnLoading: false,
        stopBtnState: true
    });
});
//uba::run::stop::success



class ServiceManage extends Component {
    componentDidMount() {
        ipc.send('uba::get::config', 'runProject');
    }
    handlerRunDev = () => {
        console.log('handlerRunDev');
        ipc.send('uba::run::dev', {
            path: runProject
        });
        actions.main.addLog(`[${util.getNowDate()}] 开始启动调试服务，请稍等……</br>`);
        actions.main.save({ devBtnLoading: true, stopBtnState: false });
    }
    handlerRunStop = () => {
        console.log('handlerRunStop');
        // actions.main.save({ devBtnLoading: false, stopBtnState: true });
        actions.main.save({ stopBtnLoading: true });
        ipc.send('uba::run::stop', {
            path: runProject
        });
    }
    handlerClearLog = () => {
        console.log('clean log');
        actions.main.save({
            devLog: []
        });
    }
    render() {
        let { devLog, toolbarHeight, devBtnLoading, devBtnState, stopBtnState, stopBtnLoading } = this.props;
        return (<div className="service-wrap">
            <Row>
                <Col span={24}>
                    <ButtonGroup className="opeate-tool">
                        <Button onClick={this.handlerRunDev} icon="rocket" disabled={devBtnState} loading={devBtnLoading} >启&nbsp;动</Button>
                        <Button onClick={this.handlerRunStop} icon="close-circle-o" disabled={stopBtnState} loading={stopBtnLoading}>停&nbsp;止</Button>
                        <Button onClick={this.handlerClearLog} icon="delete" disabled={!devLog.length} >清&nbsp;空</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col style={{ 'padding': '10px' }} span={24}>
                    <Console height={`${toolbarHeight - 120}`} inner={devLog.join('')} />
                </Col>
            </Row>
        </div>);
    }
}

export default connect((state) => state.main)(ServiceManage);
