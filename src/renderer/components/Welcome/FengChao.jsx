/**
 * 加载蜂巢组件
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Card,Tooltip } from 'antd';
import './FengChao.less';

class FengChao extends Component {
    cardHandler = (item) => () => {
        actions.welcome.setSelectProject(item);
    }
    renderProject = (list) => {
        return list.map((item, index) => (
            <Card key={index} title={item.title}>
                {
                    item.sub.map((subItem, subIndex) => (<Tooltip title={subItem.descripton}>
                        <Card.Grid onClick={this.cardHandler(subItem)} key={subIndex} className="card-item">
                            <img className="thumbnail" src={subItem.preview} />
                            <p className="subtitle">{subItem.title}</p>
                        </Card.Grid>
                    </Tooltip>))
                }
            </Card>
        ));
    }
    render() {
        let { list } = this.props;
        return (
            <div className="fengchao-wrap">
                {
                    list.length === 0 && <Card loading></Card>
                }
                {
                    list.length !== 0 && this.renderProject(list)
                }
            </div>
        );
    }
}

export default connect((state) => state.welcome)(FengChao);