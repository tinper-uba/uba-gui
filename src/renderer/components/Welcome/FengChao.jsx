/**
 * 加载蜂巢组件
 */

import React, { Component } from 'react';
import { Card } from 'antd';

import './FengChao.less';
import thumbnail from 'static/thumbnail.png';

class FengChao extends Component {
    render() {
        return (
            <div className="fengchao-wrap">
                <Card title="中后台应用(蜂巢)">
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">蜂巢业务系统</p>
                    </Card.Grid>
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">蜂巢业务系统</p>
                    </Card.Grid>
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">蜂巢业务系统</p>
                    </Card.Grid>
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">蜂巢业务系统</p>
                    </Card.Grid>
                </Card>
                <Card title="脚手架、模板工程">
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">带状态管理的系统</p>
                    </Card.Grid>
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">带状态管理的系统</p>
                    </Card.Grid>
                </Card>
                <Card title="主题">
                    <Card.Grid className="card-item">
                        <img className="thumbnail" src={thumbnail} />
                        <p className="subtitle">西瓜UI主题</p>
                    </Card.Grid>
                </Card>
            </div>
        );
    }
}

export default FengChao;
