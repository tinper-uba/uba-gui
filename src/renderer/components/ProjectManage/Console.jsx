import React, { Component } from 'react';

import './Console.less';

class Console extends Component {
    componentDidMount() {
        this.terminal = this.refs.terminal;
    }
    componentWillReceiveProps() {
        this.terminal.scrollTop = 99999;
        setTimeout(() => {
            this.terminal.scrollTop = 99999;
        }, 3000);
    }
    render() {
        let dom = document.querySelector('.console-wrap');
        return (
            <div ref="terminal" style={{ 'height': `${this.props.height}px` }} className="console-wrap" dangerouslySetInnerHTML={{ __html: this.props.inner }}>
            </div>
        );
    }
}

export default Console;
