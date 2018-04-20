/**
 * @description 一些其他杂乱的IPC消息
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-04-09 15:07:16
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain } from 'electron';
import fs from 'fs';
import { join, basename } from 'path';
import co from 'co';
import npminstall from 'npminstall';
import { UBA_CONFIG_PATH,NPMINSTALL_PATH,NPMUNINSTALL_PATH } from 'main/path';
import { fork } from 'child_process';
import { log, readFileJSON, writeFileJSON, isExistPath } from 'main/util';


export default () => {
    log('加载模块：其他IPC消息加载');
    /**
     * @description uba::set::config
     */
    ipcMain.on('uba::set::config', async (event, kv) => {
        log('写配置文件');
        let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
        ubaObj = Object.assign(ubaObj,kv);
        writeFileJSON(UBA_CONFIG_PATH, ubaObj);
    });
    /**
     * @description uba::config::read
     */
    ipcMain.on('uba::get::config', async (event,key) => {
        log('读配置文件');
        let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
        event.sender.send(`uba::get::config::success::${key}`, ubaObj);
    });

    /**
     * 单独安装一个包也就是更新
     * pkg 单独安装的包名
     * cb 回调的消息名
     */
    ipcMain.on('uba::install::package::one', async (event,argv,cb) => {
        let installPath = argv.runProject;
        console.log(installPath);
        process.chdir(installPath);
        return co(function* () {
            yield npminstall({
                // install root dir
                root: installPath,
                // optional packages need to install, default is package.json's dependencies and devDependencies
                pkgs: [
                  { name: argv.name, version: argv.version }
                ],
                // install to specific directory, default to root
                // targetDir: '/home/admin/.global/lib',
                // link bin to specific directory (for global install)
                // binDir: '/home/admin/.global/bin',
                // registry, default is https://registry.npmjs.org
                registry : 'https://registry.npm.taobao.org/',
                // debug: false,
                // storeDir: root + 'node_modules',
                ignoreScripts: true, // ignore pre/post install scripts, default is `false`
                // forbiddenLicenses: forbit install packages which used these licenses
            })
        }).then(() => {
            event.sender.send(`uba::install::package::one::${cb}`);
        }).catch((err) => {
            event.sender.send(`uba::install::package::one::${cb}::error`,err);
        });
    });

    /**
     * 单独安装一个包，包含 --save-dev --save
     */
    ipcMain.on('uba::install::one', (event,argv,cb) => {
        let npmLog, npmLogErr;
        //组织完整的安装路径
        let installPath = argv.runProject;
        console.log('npm install 组织完整的安装路径 ' + installPath)
        //切换运行目录
        process.chdir(installPath);
        //发送消息提醒开始npm install
        //event.sender.send('uba::install::start');
        //创建fork线程执行npm install
        const npminstallTerm = fork(NPMINSTALL_PATH, [argv.name, '--registry', 'https://registry.npm.taobao.org/',argv.mode], {
            cwd: installPath,
            silent: true,
            detached: true
        });
        npminstallTerm.stdout.on('data', data => {
            console.log(data.toString());
            npmLog += data.toString();
        });
        npminstallTerm.stderr.on('data', data => {
            console.log(data.toString());
            npmLogErr += data;
        });
    
        npminstallTerm.on('exit', code => {
            console.log('貌似结束了npm install code : ' + code);
            if (code == 0) {
                event.sender.send(`uba::install::one::success::${cb}`,npmLog);
            } else {
                event.sender.send(`uba::install::one::error::${cb}`,npmLogErr);
            }
        });
    });
    /**
     * 单独删除一个包，包含 --save-dev --save
     */
    ipcMain.on('uba::uninstall::one', (event,argv,cb) => {
        let npmLog, npmLogErr;
        //组织完整的安装路径
        let installPath = argv.runProject;
        console.log('npm uninstall 路径 ' ,installPath);
        //切换运行目录
        process.chdir(installPath);
        //发送消息提醒开始npm install
        //event.sender.send('uba::install::start');
        //创建fork线程执行npm install
        const npminstallTerm = fork(NPMUNINSTALL_PATH, [argv.name,argv.mode], {
            cwd: installPath,
            silent: true,
            detached: true
        });
        npminstallTerm.stdout.on('data', data => {
            console.log(data.toString());
            npmLog += data.toString();
        });
        npminstallTerm.stderr.on('data', data => {
            console.log(data.toString());
            npmLogErr += data;
        });
    
        npminstallTerm.on('exit', code => {
            console.log('貌似结束了npm uninstall code : ' + code);
            if (code == 0) {
                event.sender.send(`uba::uninstall::one::success::${cb}`,npmLog);
            } else {
                event.sender.send(`uba::uninstall::one::error::${cb}`,npmLogErr);
            }
        });
    });
    
}