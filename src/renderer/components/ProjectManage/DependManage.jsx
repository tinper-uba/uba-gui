import React, { Component } from 'react';
import { Card, Row, Col, Button, Table } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer } from 'electron';

import './DependManage.less';
const ipc = ipcRenderer;

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

class DependManage extends Component {
    render() {
        return (
            <div className="depend-wrap">
                <Row>
                    <Col span={12}>
                        <Card title="Dependencies" extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div>
                                <Table scroll={{ y: 160 }} pagination={false} dataSource={data} columns={columns} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="devDependencies" extra={<Button size="small" icon="plus" shape="circle" />} style={{ width: '100%' }}>
                            <div style={{ 'height': '190px', 'overflowY': 'auto' }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </div>
                        </Card>
                    </Col>

                </Row>

            </div>
        );
    }
}

export default DependManage;
