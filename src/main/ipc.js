/**
 * IPC消息服务
 */

import { shell, ipcMain, Notification, dialog } from 'electron';
import fs from 'fs';
import { resolve, join, basename } from 'path';
import { exec, fork, spawn } from 'child_process';
import { Buffer } from 'buffer';
import init from './action/init';
import install from './action/install';
import fixpath from 'fix-path';
import npmRunPath from 'npm-run-path';
import { Info, createDir, writeFileJSON, readFileJSON, getNowDate, log } from './util';
import { APP_PATH, NPM_PATH, UBA_PATH, UBA_CONFIG_PATH } from './path';
import Ping from 'tcp-ping';
import fse from 'fs-extra';


const IPC = () => {
    /**
     * 打开浏览器进程
     */
    ipcMain.on('uba::openUrl', (event, arg) => {
        shell.openExternal(arg);
    });
    /**
     * 导入工程，开启FileDialog
     */
    ipcMain.on('uba::import', (event, arg) => {
        log('执行项目导入操作');
        let projectPath = dialog.showOpenDialog({ properties: ['openDirectory'] });
        log(projectPath);
        if (projectPath && projectPath.length !== 0) {
            fs.readFile(join(projectPath[0], 'uba.config.js'), 'utf-8', async (err, data) => {
                if (err) {
                    event.sender.send('uba::import::error', '无效的uba前端工程');
                } else {

                    log('找到有效的uba工程，写入配置文件，参数不全');
                    let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
                    let item = {
                        title: basename(projectPath[0]),
                        template: "自行导入不存在",
                        path: join(projectPath[0])
                    };
                    ubaObj.workSpace.push(item);
                    writeFileJSON(UBA_CONFIG_PATH, ubaObj);
                    event.sender.send('uba::import::success', ubaObj.workSpace);
                }
            });
        }
    });
    /**
     * 初始化最佳实践选择的路径，开启FileDialog
     * 返回：选择文件夹路径
     */
    ipcMain.on('uba::openProject', (event, arg) => {
        let path = (dialog.showOpenDialog({ properties: ['openDirectory'] }));
        console.log(path);
        if (path && path.length !== 0) {
            event.sender.send('uba::openProject::success', path[0]);
        }
    });

    /**
     * 初始化最佳实践模板
     */
    ipcMain.on('uba::init', async (event, arg) => {
        let result = await init(arg);
        if (result.success) {
            Info('Uba', '下载成功', `项目「${arg.project}」下载完毕`);
            //TODO : 写入配置文件，文件路径、工程名即可
            let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
            let item = {
                title: arg.project,
                template: arg.selectName,
                path: join(arg.upload, arg.project)
            };
            ubaObj.workSpace.push(item);
            writeFileJSON(UBA_CONFIG_PATH, ubaObj);
            log('项目创建完毕，写入配置文件 发送IPC uba::init::success');
            event.sender.send('uba::init::success',ubaObj.workSpace);

        } else {
            Info('Uba', '下载失败', `项目「${arg.project}」下载失败`);
            event.sender.send('uba::init::error');
        }
    });
    /**
     * 接收安装指令
     */
    ipcMain.on('uba::install', (event, arg) => {
        event.sender.send('uba::install::start');
        Info('Uba', '安装依赖', `开始安装「${arg.project}」依赖`);
        install(event, arg);
    });

    /**
     * 启动调试服务
     */
    ipcMain.on('uba::server', (event, arg) => {
        // console.log(build);
        // console.log(NPM_PATH);
        fixpath();
        let log = '';
        const term = fork(NPM_PATH, ['run', 'build'], {
            silent: true,
            cwd: '/Users/kvkens/test/first',
            env: npmRunPath.env(),
            detached: true
        });

        term.stdout.on('data', data => {
            log += data.toString();
            console.log(log);
        });
        term.stderr.on('data', data => {
            console.log(data.toString());
            log += data.toString();
        });

        term.on('exit', (code) => {
            // console.log( log);
            event.sender.send('uba::server::start', log);
            Info('Uba', `命令完毕`, `code:${code} log:${log}`);
        });

    });

    /**
     * 启动构建服务
     */
    ipcMain.on('uba::build', (event, arg) => {

    });

    /**
     * 检测是否在内网npm
     */
    ipcMain.on('uba::checkNpm', (event, arg) => {
        Ping.probe(arg.ip, arg.port, function (err, available) {
            event.sender.send('uba::checkNpm::success', available);
        });
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
            event.sender.send('uba::view::project',ubaObj.workSpace);

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