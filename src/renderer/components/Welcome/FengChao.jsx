import React, { Component } from 'react';
import { Card } from 'antd';

import './FengChao.less';

const gridStyle = {
    width: '20%',
    height:'106px',
    textAlign: 'center',
};

class FengChao extends Component {
    render() {
        return (
            <Card className="fengchao-wrap" title="中后台应用(蜂巢)">
                <Card.Grid style={gridStyle}>123</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
            </Card>
        );
    }
}

export default FengChao;
