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


const IPC = () => {
    checkNpm();//内网npm环境检测
    openUrl();//打开本机默认浏览器
    importProject();//导入uba工程
    ubainstall();//加载初始化安装
    openProject();//初始化选择本地文件夹
    init();//初始化最佳实践
    stop();//停止任务命令
    
    /**
     * 启动调试服务
     */
    ipcMain.on('uba::run::dev', (event, item) => {
        log(`接收启动调试消息 调试目录 ${item.path}`);
        event.sender.send('uba::log', env);
        let logtmp = '';
        const term = fork(UBA_BIN_PATH, ['server', '--noProcess', '--chunks', '--logLevel', 'info'], {
            silent: true,
            cwd: item.path,
            env: env,
            detached: true
        });
        term.stdout.on('data', data => {
            logtmp += data.toString();
            event.sender.send('uba::run::dev::on', logtmp, term);
            // event.sender.send('uba::log', logtmp);
            // console.log(logtmp);
        });
        term.stderr.on('data', data => {
            // console.log(data.toString());
            // logtmp += data.toString();
            // event.sender.send('uba::run::build::end', data);
            event.sender.send('uba::log', data.toString());
        });

        term.on('exit', (code) => {
            console.log(code);
            event.sender.send('uba::run::dev::end', `命令执行完成`, code);
            event.sender.send('uba::log', code);
            // Info('Uba', `命令完毕`, `code:${code} log:${logtmp}`);
        });

        // t.addTerm(term, item);
        tasks.addTasks(term, item);
    });

    /**
     * 启动构建服务
     */
    ipcMain.on('uba::run::build', (event, item) => {
        log(`接收构建消息 构建目录 ${item.path}`);
        let logtmp = '';
        const term = fork(UBA_BIN_PATH, ['build'], {
            silent: true,
            cwd: item.path,
            env: env,
            detached: true
        });

        term.stdout.on('data', data => {
            logtmp += data.toString();
            event.sender.send('uba::run::build::on', (logtmp));
            // console.log(logtmp);
        });
        term.stderr.on('data', data => {
            // console.log(data.toString());
            // logtmp += data.toString();
            // event.sender.send('uba::run::build::end', data);
        });

        term.on('exit', (code) => {
            console.log(code);
            event.sender.send('uba::run::build::end', `命令执行完成`, code);
            // Info('Uba', `命令完毕`, `code:${code} log:${logtmp}`);
        });
    });

    /**
     * 打开本地指定的文件夹
     */
    ipcMain.on('uba::open::folder', (event, arg) => {
        shell.showItemInFolder(arg);
    });

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