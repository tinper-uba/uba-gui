import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button, notification, message, Layout,List, Avatar } from 'antd';
import { ipcRenderer } from 'electron';
import LeftMenu from 'components/LeftMenu';
import Logo from 'components/Logo';

import './index.less';
const { Header, Content, Footer, Sider } = Layout;


const ipc = ipcRenderer;

// ipc.on('MySpace', (event, data) => {
//     console.log(data);
// });
//测试用记得删除
ipc.on('uba::view::project2', (event, workSpace) => {
    actions.my.setWorkSpace(workSpace);
});


class MySpace extends Component {
    openHomePage = () => {
        ipc.send('uba::openUrl', 'http://tinper.org');
    }
    render() {
        let { workSpace } = this.props;
        return (
            <div className="uba-my-space">
                <Layout>
                    <Content>
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={workSpace}
                            renderItem={item => (
                                <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default MySpace;
