import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Row, Col, Button, Icon, Table } from 'antd';
import { ipcRenderer, remote } from 'electron';
import util from 'common';

import './index.less';

const ipc = ipcRenderer;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
    </span>
  ),
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

class MockData extends Component {
  componentDidMount() {
    setTimeout(() => {
      console.log(util.getUbarc(this.props.runProject));
    }, 500);
  }
  render() {
    let { toolbarHeight } = this.props;
    return (
      <div className="mock-wrap">
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => state.main)(MockData);
