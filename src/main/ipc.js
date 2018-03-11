import { shell, ipcMain, Notification, dialog } from 'electron';
import fs from 'fs';
import { resolve, join } from 'path';
import {Buffer} from 'buffer';
import init from './action/init';
import install from './action/install';
import {Info} from './util';

const IPC = () => {
    //打开默认浏览器
    ipcMain.on('uba::openUrl', (event, arg) => {
        shell.openExternal(arg);
    });
    //导入项目打开OpenDialog
    ipcMain.on('uba::import', (event, arg) => {
        let path = (dialog.showOpenDialog({ properties: ['openDirectory'] }));
        console.log(path);
        if (path && path.length !== 0) {
            fs.readFile(join(path[0], 'uba.config.js'), 'utf-8', (err, data) => {
                if (err) {
                    event.sender.send('uba::import::error', '无效的uba前端工程');
                } else {
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
            Info('下载成功',`项目「${arg.project}」下载完毕`);
            event.sender.send('uba::init::success');
        }else{
            Info('下载失败',`项目「${arg.project}」下载失败`);
            event.sender.send('uba::init::error');
        }
    });
    //安装依赖
    ipcMain.on('uba::install', (event, arg) => {
        install(event,arg);
    });
}

export default IPC;