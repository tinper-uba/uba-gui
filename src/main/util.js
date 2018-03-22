/**
 * @description 工具类函数
 * @author Kvkens(yueming@yonyou.com)
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/path.html
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/os.html
 * @update 2018-03-22 13:40:02
 */

import { Notification } from 'electron';
import is from 'electron-is';
import fse from 'fs-extra';
import fs from 'fs';
import co from 'co';
import npminstall from 'npminstall';

//不同平台和开发环境
export const isDev = is.dev();
export const isMac = is.macOS();
export const isWin = is.windows();
export const isLinux = is.linux();

/**
 * @description 系统消息推送
 * @param {*} 推送标题 
 * @param {*} 推送子标题
 * @param {*} 推送正文
 */
export const Info = (title = '标题', subtitle = '子标题', body = '正文') => {
    let info = new Notification({
        title,
        subtitle,
        body
    });
    info.show();
}

/**
 * @description npm依赖包安装，基于npm-cli实现
 * @param {event} 上层传入ipc
 * @param {string} 安装依赖路径
 * @param {string} 镜像源
 * @todo 实现本方法
 */
export const npmInstall = ({ event, installPath, registry }) => {

}

/**
 * @description 安装依赖包
 * @param {*} obj 客户端event、安装路径、镜像源 
 */
export const installPkg = ({ event, installPath, registry }) => {
    return co(function* () {
        yield npminstall({
            // install root dir
            root: installPath,
            // optional packages need to install, default is package.json's dependencies and devDependencies
            // pkgs: [
            //   { name: 'foo', version: '~1.0.0' },
            // ],
            // install to specific directory, default to root
            // targetDir: '/home/admin/.global/lib',
            // link bin to specific directory (for global install)
            // binDir: '/home/admin/.global/bin',
            // registry, default is https://registry.npmjs.org
            registry: registry,
            // debug: false,
            // storeDir: root + 'node_modules',
            ignoreScripts: true, // ignore pre/post install scripts, default is `false`
            // forbiddenLicenses: forbit install packages which used these licenses
        })
    }).then(() => {
        event.sender.send('uba::install::success');
        Info('Uba', '安装完毕', '依赖包已经成功下载安装');
    }).catch((err) => {
        event.sender.send('uba::install::error', err);
        Info('Uba', '安装失败', '依赖包可能在下载的时候超时失败了');
    });
}

/**
 * @description 创建指定的文件夹
 * @param {string} dirPath 欲创建文件夹路径
 * @returns {Promise} promise
 */
export const createDir = async (dirPath) => {
    await fse.mkdir(dirPath);
}

/**
 * @description 写入JSON到文件
 * @param {string} 写入路径、JSON
 * @param {object} 写入JSON对象
 * @returns {Promise} promise
 */
export const writeFileJSON = async (jsonPath, obj) => {
    return await fse.writeJSON(jsonPath, obj);
}

/**
 * @description 读取指定路径下的JSON文件
 * @param {string} 路径 
 * @returns {Promise} promise
 */
export const readFileJSON = async (jsonPath) => {
    return await fse.readJson(jsonPath);
}

/**
 * @description 打印日志
 * @param {string,boolean} 日志内容、可选参数：true=直接显示 false=不显示
 * @returns {string} 日志 时间-内容
 */
export const log = (text, flag) => {
    console.log(`[${getNowDate()}] ${text}`);
    if (flag) {
        console.log(text);
    }
    return `[${getNowDate()}] ${text}`;
}

/**
 * @description 获得主机时间
 * @returns {string} 本机时间
 */
export const getNowDate = () => {
    let dt = new Date();
    return dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDay() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}
