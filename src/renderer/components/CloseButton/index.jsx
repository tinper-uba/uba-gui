import React, { Component } from 'react';
import { remote, ipcRenderer } from 'electron';
import './index.less';
const win = remote.getGlobal('win');
const ipc = ipcRenderer;

const closeHandler = () => {
    win.hide();
}
const minHandler = () => {
    win.minimize();
}
const maxHandler = () => {
    win.maximize();
}

class componentName extends Component {
    render() {
        let { isMax,isMin,isClose } = this.props;
        return (
            <div className="toolbar">
                {isClose && <span title="关闭" onClick={closeHandler} className="btn close"></span>}
                {isMin && <span title="最小化" onClick={minHandler} className="btn min"></span>}
                {isMax && <span title="最大化" onClick={maxHandler} className="btn max"></span>}
            </div>
        );
    }
}

export default componentName;
