/**
 * @description 新版使用npm-cli来安装依赖
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-23 10:31:26
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html
 */

import { NPM_PATH } from 'main/path';
import { fork } from 'child_process';
import { resolve } from 'path';
import env from 'main/env';

/**
 * @description 安装依赖
 * @param {event} event 上层传入ipc
 * @param {string} argv.upload 安装路径
 * @param {string} argv.project 安装文件夹
 * @param {string} argv.registry 镜像源
 * @param {promise} Promise 
 */
export default (event, argv) => {
    let npmLog, npmLogErr;
    //组织完整的安装路径
    let installPath = resolve(argv.upload, argv.project);
    console.log('组织完整的安装路径 ' + installPath)
    //切换运行目录
    process.chdir(installPath);
    //发送消息提醒开始npm install
    event.sender.send('uba::install::start');
    //创建fork线程执行npm install
    const npminstallTerm = fork(NPM_PATH, ['install', '--registry', argv.registry], {
        cwd: installPath,
        silent: true,
        detached: true
    });
    npminstallTerm.stdout.on('data', data => {
        console.log(data.toString())
        npmLog += data.toString();
    });
    npminstallTerm.stderr.on('data', data => {
        console.log('---' + data);
        npmLogErr += data;
    });

    return new Promise((resolve, reject) => {
        npminstallTerm.on('exit', code => {
            console.log('貌似结束了npm install code : ' + code);
            if (code == 0) {
                resolve({ success: true, code });
            } else {
                reject({ success: false, code, npmLogErr });
            }
        });
    });
}
