import React, { Component } from 'react';
import loadingGif from 'static/loading.gif';
import { Divider, Progress } from 'antd';

import './index.less';

class Waiting extends Component {
    render() {
        let { processMsg, percent } = this.props;

        return (
            <div className="waiting">
                <div className="img">
                    <img src={loadingGif} />
                </div>
                <Divider>{processMsg}</Divider>
                <Progress percent={percent} />
            </div>
        );
    }
}

export default Waiting;
