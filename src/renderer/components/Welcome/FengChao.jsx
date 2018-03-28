/**
 * 加载蜂巢组件
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import { Card } from 'antd';

import './FengChao.less';
import thumbnail from 'static/thumbnail.png';

class FengChao extends Component {
    renderProject = (list) => {
        return list.map((item, index) => (
            <Card key={index} title={item.title}>
                {
                    item.sub.map((subItem, subIndex) => (
                        <Card.Grid key={subIndex} className="card-item">
                            <img className="thumbnail" src={subItem.preview} />
                            <p className="subtitle">{subItem.title}</p>
                        </Card.Grid>
                    ))
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

                {/* <Card title="中后台应用(蜂巢)">
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">蜂巢业务系统</p>
                    </Card.Grid>
                </Card> */}
            </div>
        );
    }
}

export default connect((state) => state.welcome)(FengChao);