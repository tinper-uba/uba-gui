import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import path from 'path';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, shell } from 'electron';
import Convert from 'ansi-to-html';
import util from 'common';
import Console from './Console';
import './BuildRes.less';

let convert = new Convert();

let runProject;

const ipc = ipcRenderer;
const ButtonGroup = Button.Group;

ipc.on('uba::get::config::success::runProject', (event, obj) => {
    actions.main.save({ runProject: obj['runProject'] });
    runProject = obj['runProject'];
});
//调试服务日志
ipc.on('uba::run::build::on', (event, log) => {
    actions.main.addBuildLog(convert.toHtml(log.replace(/\n/g, '<br>')));
});
//构建服务成功
ipc.on('uba::run::build::success', (event) => {
    console.log('exit success');
    actions.main.addBuildLog(`[${util.getNowDate()}] 命令执行完毕</br>`);
    actions.main.save({
        buildBtnLoading: false
    });
    shell.showItemInFolder(path.join(actions.main.getS().main.runProject, 'dist'));
});
//调试服务正常停止
ipc.on('uba::run::build::error', (event, log) => {
    console.log('exit error')
    actions.main.addBuildLog(`[${util.getNowDate()}] 内部构建发生严重错误，请检查项目配置错误信息</br>`);
    actions.main.save({
        buildBtnLoading: false
    });
});
// ipc.on('uba::run::build::error-1', (event,log) => {
//     actions.main.addBuildLog(log);
// });


class BuildRes extends Component {
    componentDidMount() {
        ipc.send('uba::get::config', 'runProject');
    }
    handlerRunBuild = () => {
        console.log('handlerRunBuild');
        ipc.send('uba::run::build', {
            path: runProject
        });
        actions.main.addBuildLog(`[${util.getNowDate()}] 开始启动构建资源服务，请稍等……</br>`);
        actions.main.save({ buildBtnLoading: true });
    }
    handlerClearLog = () => {
        console.log('clean log');
        actions.main.save({
            buildLog: []
        });
    }
    render() {
        let { buildLog, toolbarHeight, buildBtnLoading } = this.props;
        return (<div className="build-wrap">
            <Row>
                <Col span={24}>
                    <ButtonGroup className="opeate-tool">
                        <Button onClick={this.handlerRunBuild} icon="rocket" loading={buildBtnLoading} >构&nbsp;建</Button>
                        <Button onClick={this.handlerClearLog} icon="delete" disabled={!buildLog.length} >清&nbsp;空</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col style={{ 'padding': '10px' }} span={24}>
                    <Console height={`${toolbarHeight - 120}`} inner={buildLog.join('')} />
                </Col>
            </Row>
        </div>);
    }
}

export default connect((state) => state.main)(BuildRes);
