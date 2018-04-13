import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import './ServiceManage.less';

class ServiceManage extends Component {
    render() {
        return (
            <Row>
                <Col span={24}>
                    <Button>开始</Button>
                </Col>
            </Row>
        );
    }
}

export default ServiceManage;
