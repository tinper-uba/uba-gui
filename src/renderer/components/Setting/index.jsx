import React, { Component } from 'react';
import { Tabs, Row, Col } from 'antd';
import {ipcRenderer} from 'electron';
import Empty from '../Empty';
import './index.less';

const ipc = ipcRenderer;

class Setting extends Component {
    render() {
        return (<div className="setting-wrap">
            <Row>
                <Col span={24}>
                    <Empty title="设置" />
                </Col>
            </Row>
        </div>);
    }
}

export default Setting;
