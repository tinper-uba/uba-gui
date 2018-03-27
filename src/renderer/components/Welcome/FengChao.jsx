import React, { Component } from 'react';
import { Card } from 'antd';

import './FengChao.less';

const gridStyle = {
    width: '25%',
    height:'130px',
    textAlign: 'center',
};

class FengChao extends Component {
    render() {
        return (
            <Card title="中后台应用(蜂巢)">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        );
    }
}

export default FengChao;
