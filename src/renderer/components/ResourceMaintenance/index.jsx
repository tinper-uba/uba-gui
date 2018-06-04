import React, { Component } from 'react';
import { Row, Col } from 'antd';
import DependManage from '../ProjectManage/DependManage';

import './index.less';

class ResourceMaintenance extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <DependManage />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ResourceMaintenance;
