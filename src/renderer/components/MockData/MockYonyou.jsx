import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, remote } from 'electron';
import './index.less';

const ipc = ipcRenderer;

ipc.on('uba::test::end', (event, ss) => {
    console.log(ss);
});

class MockYonyou extends Component {
    componentDidMount() {
        let webview = document.querySelector("#foo");
        webview.addEventListener('dom-ready', () => {
            // webview.openDevTools();
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
        });
        console.log('webview');
        // ipc.send('uba::test');
        // setTimeout(() => {
        // console.log('mock');

        //     ipc.send('uba::test');
        // }, 5000);
    }
    render() {
        let { toolbarHeight } = this.props;
        return (
            <webview useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" style={{ 'height': toolbarHeight }} id="foo" src="https://mock.yonyoucloud.com/"></webview>
        );
    }
}

export default connect((state) => state.main)(MockYonyou);