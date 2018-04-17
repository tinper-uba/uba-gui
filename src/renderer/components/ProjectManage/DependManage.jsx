import React, { Component } from 'react';
import { Card, Row, Col,Button } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer } from 'electron';

import './DependManage.less';
const ipc = ipcRenderer;

class DependManage extends Component {
    render() {
        return (
            <div className="depend-wrap">
                <Row>
                    <Col span={12}>
                        <Card title="Dependencies" extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="devDependencies" extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>

                </Row>

            </div>
        );
    }
}

export default DependManage;
