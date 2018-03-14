import React, { Component } from 'react';
import { NavLink } from 'mirrorx';
import { Menu, Icon } from 'antd';

class LeftMenu extends Component {
    render() {
        let { sourceData } = this.props;
        return (
            <Menu theme="light" mode="inline">
                {
                    sourceData.map((item, index) => (
                        <Menu.Item key={item.title}>
                            <NavLink to="/"><Icon type="appstore-o" />{item.title}</NavLink>
                        </Menu.Item>
                    ))
                }
            </Menu>
        );
    }
}


export default LeftMenu;
