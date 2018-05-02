import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'antd';
import path from 'path';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer, shell } from 'electron';
import util from 'common';
import './ProxySetting.less';



const ipc = ipcRenderer;



class ProxySetting extends Component {
    componentDidMount() {

    }
    render() {
        let { toolbarHeight } = this.props;
        return (<div className="proxy-wrap">
            <Row>
                <Col style={{ 'padding': '10px' }} span={24}>
                    代理设置这里是表格
                </Col>
            </Row>
        </div>);
    }
}

export default connect((state) => state.main)(ProxySetting);
