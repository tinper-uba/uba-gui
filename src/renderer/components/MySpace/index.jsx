import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification, message } from 'antd';
import { ipcRenderer } from 'electron';
import './index.less';



const ipc = ipcRenderer;

ipc.on('MySpace', (event, data) => {
    console.log(data);
});




class MySpace extends Component {
    openHomePage = () => {
        ipc.send('uba::openUrl', 'http://tinper.org');
    }
    render() {
        return (
            <div className="uba-my-space">
                MySpace
            </div>
        );
    }
}

export default MySpace;
