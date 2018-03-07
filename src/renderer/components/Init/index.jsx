import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, Row, Col } from 'antd';
import { ipcRenderer } from 'electron';
import './index.less';

const ipc = ipcRenderer;

class Init extends Component {
    render() {
        return (
            <div className="uba-init">
                <Row>
                    <Col span={24}>创建一个最佳实践模板</Col>
                </Row>
                <Row>
                    <Col span={24}>创建一个最佳实践模板</Col>
                </Row>

            </div>
        );
    }
}

export default Init;
