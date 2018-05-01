import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Row, Col, Button, Icon, Table, Input } from 'antd';
import { ipcRenderer, remote } from 'electron';
import util from 'common';
import uuid from 'uuid';

import './index.less';

const ipc = ipcRenderer;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input size="small" style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
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
      render: (text, record) => this.renderColumns(text, record, 'method')
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
          :<Button onClick={() => this.edit(record.key)} size="small">编辑</Button>}
        </span>)
      }
    }]
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
    }, 500);
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
    }
  }

  cancel = (key) => {
    const newData = [...this.props.mockTableData];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
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
