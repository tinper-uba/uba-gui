import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Row, Col, Button, Icon, Table } from 'antd';
import { ipcRenderer, remote } from 'electron';
import util from 'common';

import './index.less';

const ipc = ipcRenderer;

const columns = [{
  title: '请求方法',
  dataIndex: 'method',
  key: 'method',
  width: '10%'
}, {
  title: '路由地址',
  dataIndex: 'url',
  key: 'url',
  width: '35%'
}, {
  title: '本地数据',
  dataIndex: 'path',
  key: 'path',
  width: '35%'
}, {
  title: '操作',
  width: '20%',
  key: 'action',
  render: (text, record) => (
    <span>
      <Button size="small">编辑</Button>
    </span>
  ),
}];
const data = [{
  key: '0',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '1',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '2',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '3',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '4',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '5',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '55',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '54',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '53',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '52',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '36',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '35',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '34',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '33',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '32',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}, {
  key: '31',
  method: 'GET',
  url: '/nc/api/user',
  path: './mock/nc/api/user.json'
}];

class MockData extends Component {
  componentDidMount() {
    setTimeout(() => {
      let mock = util.getUbarc(this.props.runProject).mock;
      console.log(mock);
      let arr = [];
      for (let i = 0; i < Object.keys(mock).length; i++) {
        let method = Object.keys(mock)[i];
        console.log(method);
        for (let j = 0; j < mock[method].length; j++) {
          console.log(Object.keys(mock[method][j])[0]);
          console.log(Object.values(mock[method][j])[0])
          arr.push({
            key: new Date().getTime(),
            method: method,
            url : Object.keys(mock[method][j])[0],
            path:Object.values(mock[method][j])[0]
          });
        }
        // for (let j = 0; j < Object.keys(mock)[i].length; j++) {
        //   arr.push({
        //     key: new Date().getTime(),
        //     method: method,
        //     url : '',
        //     path:''
        //   });
        // }
      }
      actions.main.save({
        mockTableData: arr
      });
    }, 500);
  }
  render() {
    let { toolbarHeight,mockTableData } = this.props;
    return (
      <div className="mock-wrap">
        <Row>
          <Col span={24}>
            <Table
              pagination={false}
              columns={columns}
              dataSource={mockTableData}
              scroll={{ y: toolbarHeight - 100 }}
              rowKey={record => record.key}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => state.main)(MockData);
