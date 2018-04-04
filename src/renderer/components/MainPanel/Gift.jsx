import React, { Component } from 'react';
import { Row, Col } from 'antd';
import giftPng from 'static/gift.png';

class Gift extends Component {
    render() {
        return (
            <Row>
                <Col span={24}>
                    <img src={giftPng} />
                </Col>
            </Row>
        );
    }
}

export default Gift;
