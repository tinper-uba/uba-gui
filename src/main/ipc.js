/**
 * @description IPC消息类
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:14:29
 * @see https://electronjs.org/docs/api/ipc-main
 * @see https://electronjs.org/docs/api/shell
 * @see https://electronjs.org/docs/api/dialog
 * @see https://electronjs.org/docs/api/notification
 */

import { shell, ipcMain, Notification, dialog } from 'electron';
import fs from 'fs';
import { resolve, join, basename } from 'path';
import os from 'os';
import { exec, fork, spawn } from 'child_process';
import { Buffer } from 'buffer';
import env from './env';
import { Info, createDir, writeFileJSON, readFileJSON, getNowDate, log } from './util';
import { APP_PATH, NPM_PATH, UBA_PATH, UBA_CONFIG_PATH, UBA_BIN_PATH } from './path';
import fse from 'fs-extra';
import tasks from './tasks';

import checkNpm from './ipc/checkNpm';
import openUrl from './ipc/openUrl';
import importProject from './ipc/importProject';
import ubainstall from './ipc/ubainstall';
import openProject from './ipc/openProject';
import init from './ipc/init';
import stop from './ipc/stop';
import ubaserver from './ipc/ubaserver';
import openFolder from './ipc/openFolder';
import ubabuild from './ipc/ubabuild';

const IPC = () => {
    checkNpm();//内网npm环境检测
    openUrl();//打开本机默认浏览器
    importProject();//导入uba工程
    ubainstall();//加载初始化安装
    openProject();//初始化选择本地文件夹
    init();//初始化最佳实践
    stop();//停止任务命令
    ubaserver();//调试服务
    openFolder();//资源定位
    ubabuild();//构建静态资源服务


    /**
     * 检查本地是否有uba配置文件，没有创建，有就读取
     */
    ipcMain.on('uba::checkLocalUbaConfig', async (event, arg) => {
        log('开始检测uba本地配置文件');
        //检测uba配置文件是否存在
        if (fs.existsSync(UBA_CONFIG_PATH)) {
            //存在，进行读取操作，切换视图
            log('配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project');
            //读取项目数据用于发送到前端组件state
            let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
            event.sender.send('uba::view::project', ubaObj.workSpace);

        } else {
            log('配置不存在，创建配置')
            //不存在，创建新的配置文件等待下一次读取
            let ubaObj = {
                name: "uba-gui",
                version: "1.0.0",
                time: getNowDate(),
                lastPath: "",
                workSpace: []
            };
            //创建uba文件夹
            createDir(UBA_PATH);

            //写入配置默认文件
            try {
                writeFileJSON(UBA_CONFIG_PATH, ubaObj);
                log('创建配置文件写入成功')
            } catch (error) {
                log(error)
            }
        }
    });
    //警告⚠️测试用记得删除
    ipcMain.on('uba::checkLocalUbaConfig2', async (event, arg) => {
        log('开始检测uba本地配置文件');
        //检测uba配置文件是否存在
        if (fs.existsSync(UBA_CONFIG_PATH)) {
            //存在，进行读取操作，切换视图
            log('配置存在，读取显示工作区并切换组件，发送IPC消息 uba::view::project');
            //读取项目数据用于发送到前端组件state
            let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
            event.sender.send('uba::view::project2', ubaObj.workSpace);

        } else {
            log('配置不存在，创建配置')
            //不存在，创建新的配置文件等待下一次读取
            let ubaObj = {
                name: "uba-gui",
                version: "1.0.0",
                time: getNowDate(),
                lastPath: "",
                workSpace: []
            };
            //创建uba文件夹
            createDir(UBA_PATH);

            //写入配置默认文件
            try {
                writeFileJSON(UBA_CONFIG_PATH, ubaObj);
                log('创建配置文件写入成功')
            } catch (error) {
                log(error)
            }
        }
    });
}

export default IPC;