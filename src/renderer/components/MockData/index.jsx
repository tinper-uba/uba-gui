import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, remote } from 'electron';
import './index.less';

const ipc = ipcRenderer;

ipc.on('uba::test::end', (event,ss) => {
    console.log(ss);
});

class MockData extends Component {
    componentDidMount() {
        let webview = document.querySelector("#foo");
        webview.addEventListener('dom-ready', () => {
            //webview.openDevTools();
            // let session = webview.getWebContents().session;
            // session.cookies.get({ url: 'https://mock.yonyoucloud.com/' }, function (error, cookies) {
            //     console.log(cookies);
            //     let cookieStr = ''
            //     for (var i = 0; i < cookies.length; i++) {
            //         let info = cookies[i];
            //         cookieStr += `${info.name}=${info.value};`;
            //         console.log(info.name,'=', info.value);
            //     }
            //     console.log(cookieStr);
            // });
            //ipc.send('uba::test');
        })
        // setTimeout(() => {
        // console.log('mock');

        //     ipc.send('uba::test');
        // }, 5000);
    }
    render() {
        let { toolbarHeight } = this.props;
        return (
            <webview style={{ 'height': toolbarHeight }} id="foo" src="https://mock.yonyoucloud.com/"></webview>
        );
    }
}

export default connect((state) => state.main)(MockData);
