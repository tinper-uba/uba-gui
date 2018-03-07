import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
const ipc = ipcRenderer;
import './index.less';

ipc.on('uba::openUrl::success', (event, arg) => {
    console.log(arg);
});

class Logo extends Component {
    openHomePage = () => {
        ipc.send('uba::openUrl', 'http://tinper.org');
    }
    render() {
        return (
            <div className="logo" onClick={this.openHomePage} ></div>
        );
    }
}

export default Logo;
