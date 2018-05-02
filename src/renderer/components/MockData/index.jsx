import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Row, Col, Button, Icon, Table, Input, Select } from 'antd';
import { ipcRenderer, remote } from 'electron';
import util from 'common';
import uuid from 'uuid';

import './index.less';

const ipc = ipcRenderer;
const Option = Select.Option;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input size="small" style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
const EditableCellSelect = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Select size="small" defaultValue={value} style={{ width: 90 }} onChange={value => onChange(value)}>
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
          <Option value="DELETE">DELETE</Option>
          <Option value="PUT">PUT</Option>
          <Option value="PATCH">PATCH</Option>
          <Option value="HEAD">HEAD</Option>
          <Option value="OPTIONS">OPTIONS</Option>
        </Select>
      : value
    }
  </div>
);

class MockData extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
      width: '10%',
      render: (text, record) => this.renderColumnsSelect(text, record, 'method')
    }, {
      title: '路由地址',
      dataIndex: 'url',
      key: 'url',
      width: '35%',
      render: (text, record) => this.renderColumns(text, record, 'url')
    }, {
      title: '本地数据',
      dataIndex: 'path',
      key: 'path',
      width: '35%',
      render: (text, record) => this.renderColumns(text, record, 'path')
    }, {
      title: '操作',
      width: '20%',
      key: 'action',
      render: (text, record) => {
        const { editable } = record;
        return (<span>
          {editable ? <span>
            <Button onClick={() => this.save(record.key)} size="small">保存</Button>
            <Button onClick={() => this.cancel(record.key)} size="small">取消</Button>
          </span>
            : <Button onClick={() => this.edit(record.key)} size="small">编辑</Button>}
        </span>)
      }
    }];

  }
  componentDidMount() {
    setTimeout(() => {
      let mock = util.getUbarc(this.props.runProject).mock;
      console.log(mock);
      let arr = [];
      for (let i = 0; i < Object.keys(mock).length; i++) {
        let method = Object.keys(mock)[i];
        for (let j = 0; j < mock[method].length; j++) {
          arr.push({
            key: uuid(),
            method: method,
            url: Object.keys(mock[method][j])[0],
            path: Object.values(mock[method][j])[0]
          });
        }
      }
      actions.main.save({
        mockTableData: arr
      });
      this.cacheData = arr.map(item => ({ ...item }));
    }, 500);
  }
  componentWillUnmount() {
    actions.main.save({
      mockTableData: []
    });
  }

  renderColumns = (text, record, column) => {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  renderColumnsSelect = (text, record, column) => {
    return (
      <EditableCellSelect
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleChange = (value, key, column) => {
    const newData = [...this.props.mockTableData];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      actions.main.save({
        mockTableData: newData
      });
    }
  }
  save = (key) => {
    const newData = [...this.props.mockTableData];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      actions.main.save({
        mockTableData: newData
      });
      this.cacheData = newData.map(item => ({ ...item }));
      console.log(this.cacheData);
      console.log('table数据转换为本地数据开始');
      let ubarcMock = {};
      let subArray = [];
      for (let i = 0; i < this.cacheData.length; i++) {
        let method = this.cacheData[i].method;
        let path = this.cacheData[i].path;
        let url = this.cacheData[i].url;
        if (typeof ubarcMock[method] === 'undefined') {
          ubarcMock[method] = [];
        }
        ubarcMock[method] = ubarcMock[method].concat({
          [url]: path
        });
      }
      //写入配置
      util.setUbarc(this.props.runProject, 'mock', ubarcMock);

    }
  }

  cancel = (key) => {
    const newData = [...this.props.mockTableData];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      actions.main.save({
        mockTableData: newData
      });
    }
  }

  edit = (key) => {
    const newData = [...this.props.mockTableData];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      actions.main.save({
        mockTableData: newData
      });
    }
  }
  render() {
    let { toolbarHeight, mockTableData } = this.props;
    return (
      <div className="mock-wrap">
        <Row>
          <Col span={24}>
            <Table
              loading={!mockTableData.length}
              pagination={false}
              columns={this.columns}
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
