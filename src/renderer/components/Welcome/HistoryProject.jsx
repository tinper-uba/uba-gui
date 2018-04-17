/**
 * 打开历史工程组件
 */

import React, { Component } from 'react';
import path from 'path';
import { Card, Icon, message, Tooltip } from 'antd';
import mirror, { actions, connect } from 'mirrorx';
import { ipcRenderer } from 'electron';
import './HistoryProject.less';

const ipc = ipcRenderer;

//打开无效工程
ipc.on('uba::import::error', (event, errMsg) => {
    message.error(errMsg);
});
//导入有效工程，得到最新工程对象
ipc.on('uba::import::success', (event, workSpace) => {
    actions.welcome.setHistoryProject(workSpace);
});

//接收本地配置历史记录
ipc.on('uba::view::project', (event, workSpace, lastpath) => {
    actions.welcome.setHistoryProject(workSpace);
    actions.welcome.setLastPath(lastpath);
});

class HistoryProject extends Component {
    openHistoryHandler = (item, index) => () => {
        actions.welcome.save({
            projectName: item.projectName,
            projectPath: item.projectPath,
            repositories: item.repositories,
            organization: item.organization,
            registry: item.registry
        });
        ipc.send('uba::set::config',{
            runProject : path.join(item.projectPath,item.projectName),
            title:item.title
        });
        actions.welcome.finish();
    }
    renderHistoryProject = (historyArr) => {
        //https://img.alicdn.com/tfs/TB1tnAWdHSYBuNjSspiXXXNzpXa-1920-1080.png
        return historyArr.map((item, index) => (
            <Tooltip placement="right" key={index} title={'位置：' + item.path}>
                <Card.Grid onClick={this.openHistoryHandler(item, index)} className="card-item card-history">
                    <img className="thumbnail" src="https://img.alicdn.com/tfs/TB1tnAWdHSYBuNjSspiXXXNzpXa-1920-1080.png" />
                    <p className="subtitle">{item.title}</p>
                </Card.Grid>
            </Tooltip>
        ))
    }
    render() {
        let { historyProject } = this.props;
        return (
            <div className="history-project-wrap">
                <Card>
                    <Card.Grid className="card-item">
                        <Tooltip placement="top" title="导入现有uba前端工程">
                            <Icon onClick={() => { ipc.send('uba::import') }} className="plus" type="plus" />
                        </Tooltip>
                    </Card.Grid>

                    {
                        this.renderHistoryProject(historyProject)
                    }

                </Card>
            </div>
        );
    }
}

export default connect((state) => state.welcome)(HistoryProject);