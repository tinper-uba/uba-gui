import React, { Component } from 'react';
import { Row, Col } from 'antd';
import giftPng from 'static/gift.png';

import './Gift.less';

class Gift extends Component {
    render() {
        return (
            <Row className="main-gift-wrap">
                <Col span={24}>
                    <img src={giftPng} />
                </Col>
                <Col span={24}>
                    <h4>在这里尽情拼搏你的才华</h4>
                </Col>
                <Col span={24}>
                    <h4>让时光不在一行行代码中流逝</h4>
                </Col>
                <Col span={24}>
                    <h2>只为让你离梦想更快一些</h2>
                </Col>
            </Row>
        );
    }
}

export default Gift;
