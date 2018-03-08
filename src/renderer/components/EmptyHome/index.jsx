import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification,message } from 'antd';
import { ipcRenderer } from 'electron';
import './index.less';



const ipc = ipcRenderer;

ipc.on('uba::import::success', (event, data) => {
    console.log(data);
});
ipc.on('uba::import::error', (event, msg) => {
    message.error(msg);
});


class EmptyHome extends Component {
    openHomePage = () => {
        ipc.send('uba::openUrl', 'http://tinper.org');
    }
    importExisProject = () => {
        console.log('import')
        ipc.send('uba::import');
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
