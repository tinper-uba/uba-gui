import React, { Component } from 'react';
import loadingGif from 'static/loading.gif';

import './index.less';

class Waiting extends Component {
    render() {
        return (
            <div className="waiting">
                <img src={loadingGif} />
            </div>
        );
    }
}

export default Waiting;
