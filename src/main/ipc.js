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
import checkLocalConfig from './ipc/checkLocalConfig';
import other from './ipc/other';
import test from './ipc/test';


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
    checkLocalConfig();//检查uba配置文件
    other();
    test();
}

export default IPC;