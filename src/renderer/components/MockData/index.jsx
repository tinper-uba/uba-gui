import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Row, Col, Button, Icon, Table, Input, Select, Popconfirm } from 'antd';
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
      render: (text, record, index) => {
        const { editable } = record;
        return (<span>
          {editable ? <span>
            <Button type="primary" style={{ 'marginRight': '4px' }} onClick={() => this.save(record.key)} size="small">保存</Button>
            <Button onClick={() => this.cancel(record.key, index)} size="small">取消</Button>
          </span>
            : <span><Button style={{ 'marginRight': '4px' }} onClick={() => this.edit(record.key)} size="small">编辑</Button>
              <Popconfirm title="是否确认删除该条Mock?" onConfirm={() => this.remove(index)} okText="删除" cancelText="取消">
                <Button type="danger" size="small">删除</Button>
              </Popconfirm></span>
          }
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

  cancel = (key, index) => {
    const newData = [...this.props.mockTableData];
    const target = newData.filter(item => key === item.key)[0];
    if (target.isNew) {
      newData.splice(index, 1);
      actions.main.save({
        mockTableData: newData
      });
    } else {
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        actions.main.save({
          mockTableData: newData
        });
      }
    }
  }

  edit = (key) => {
    const newData = [...this.props.mockTableData];
    const target = newData.filter(item => key === item.key)[0];
    if (target.isNew) {
      delete target.isNew;
      target.editable = true;
      actions.main.save({
        mockTableData: newData
      });
    } else {
      if (target) {
        target.editable = true;
        actions.main.save({
          mockTableData: newData
        });
      }
    }

  }

  remove = (index) => {
    const newData = [...this.props.mockTableData];
    newData.splice(index, 1);
    actions.main.save({
      mockTableData: newData
    });
    this.cacheData = newData.map(item => ({ ...item }));
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

  handleAddMock = () => {
    const newData = [...this.props.mockTableData];
    const item = {
      editable: true,
      key: uuid(),
      method: 'GET',
      url: '',
      path: '',
      isNew: true
    };
    newData.push(item);
    actions.main.save({
      mockTableData: newData
    });
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
              size="small"
              columns={this.columns}
              dataSource={mockTableData}
              title={() => <Button onClick={this.handleAddMock} type="" style={{ 'marginLeft': '5px' }}>添加数据</Button>}
              scroll={{ y: toolbarHeight - 150 }}
              rowKey={record => record.key}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => state.main)(MockData);
