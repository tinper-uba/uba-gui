import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification, message } from 'antd';
import { ipcRenderer } from 'electron';
import './index.less';



const ipc = ipcRenderer;

ipc.on('uba::import::success', (event, data) => {
    console.log(data);
});
ipc.on('uba::import::error', (event, msg) => {
    message.error(msg);
});
ipc.on('uba::server::start', (event, msg) => {
    message.error(msg);
});

/**
 * 接收服务端当前运行npm镜像检测
 */
ipc.on('uba::checkNpm::success', (event, msg) => {
    if (msg) {
        actions.init.changeYonyouNpm();
    }
});


/**
 *  接收服务端切换工作区的通知
 */
ipc.on('uba::view::project', (event, workSpace) => {
    console.log('接收到切换工作区通知 uba::view::project ', workSpace);
    actions.my.setWorkSpace(workSpace);
    if (workSpace.length !== 0) {
        actions.routing.push('/my');
    }
});


class EmptyHome extends Component {
    openHomePage = () => {
        ipc.send('uba::openUrl', 'http://tinper.org');
    }
    importExisProject = () => {
        // console.log('import')
        ipc.send('uba::import');
        // ipc.send('uba::server');

    }
    openMessage = () => {
        // notification.open({
        //     message: 'Notification Title',
        //     description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        // });
        message.success('开始导入工程');
    }
    render() {
        return (
            <div className="uba-empty-home">
                <div title="欢迎使用前端集成开发工具" className="empty-icon" onClick={this.openHomePage}></div>
                <div className="version">欢迎使用前端uba开发工具，请选择您的操作</div>
                <div className="op">
                    <Button onClick={() => actions.emptyhome.init()} className="btn" type="primary" ghost icon="plus-circle-o">创建新项目</Button>
                    <Button onClick={this.importExisProject} className="btn" type="primary" ghost icon="upload">导入新项目</Button>
                </div>
            </div>
        );
    }
}

export default EmptyHome;
