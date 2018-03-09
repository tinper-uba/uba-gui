import { shell, ipcMain, Notification, dialog } from 'electron';
import fs from 'fs';
import { resolve, join } from 'path';
import init from './action/init';

const IPC = () => {
    let myNotification = new Notification({
        title: '测试标题',
        body: '测试的部分'
    });
    //打开默认浏览器
    ipcMain.on('uba::openUrl', (event, arg) => {
        shell.openExternal(arg);
        myNotification.show();
        event.sender.send('uba::openUrl::success', true);
    });
    //导入项目打开OpenDialog
    ipcMain.on('uba::import', (event, arg) => {
        let path = (dialog.showOpenDialog({ properties: ['openDirectory'] }));
        console.log(path);
        if (path && path.length !== 0) {
            fs.readFile(join(path[0], 'uba.config.js'), 'utf-8', (err, data) => {
                if (err) {
                    event.sender.send('uba::import::error', '非法的uba前端工程');
                } else {
                    console.log(data);
                    event.sender.send('uba::import::success', data);
                }
            });
        }
    });
    //创建工程选择目录
    ipcMain.on('uba::openProject', (event, arg) => {
        let path = (dialog.showOpenDialog({ properties: ['openDirectory'] }));
        console.log(path);
        if (path && path.length !== 0) {
            event.sender.send('uba::openProject::success', path[0]);
        }
    });
    //接收下载远程仓库模板
    ipcMain.on('uba::init', async (event, arg) => {
        let result = await init(arg);
        if (result.success) {
            new Notification({
                title: '初始化成功',
                body: `前端工程【${arg.selectName}】安装成功!`
            }).show();
        }else{

        }
    });
}

export default IPC;