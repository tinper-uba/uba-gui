import React, { Component } from 'react';
import empty from 'static/empty.jpg';
import './index.less';

class Empty extends Component {
    render() {
        return (
            <div className="empty-wrap">
                <img src={empty} />
                <h1>『{this.props.title}』功能建设中</h1>
            </div>
        );
    }
}

export default Empty;
