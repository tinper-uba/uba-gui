import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';


import './index.less';

class MockData extends Component {
    render() {
        let { toolbarHeight } = this.props;
        return (
            <webview style={{ 'height': toolbarHeight }} id="foo" src="https://mock.yonyoucloud.com/"></webview>
        );
    }
}

export default connect((state) => state.main)(MockData);
