import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button } from 'antd';
import { ipcRenderer } from 'electron';
import './index.less';

const ipc = ipcRenderer;

class EmptyHome extends Component {
    openHomePage = () => {
        ipc.send('uba::openUrl', 'http://tinper.org');
    }
    render() {
        return (
            <div className="uba-empty-home">
                <div title="欢迎使用前端集成开发工具" className="empty-icon" onClick={this.openHomePage}></div>
                <div className="version">欢迎使用前端uba开发工具，请选择您的操作</div>
                <div className="op">
                    <Button onClick={() => actions.emptyhome.init()} className="btn" type="primary" ghost icon="plus-circle-o">创建新项目</Button>
                    <Button className="btn" type="primary" ghost icon="upload">导入新项目</Button>
                </div>
            </div>
        );
    }
}

export default EmptyHome;
