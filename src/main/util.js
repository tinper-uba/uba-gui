/**
 * 辅助工具类
 */

import { Notification } from 'electron';
import is from 'electron-is';
import fse from 'fs-extra';
import fs from 'fs';
import co from 'co';
import npminstall from 'npminstall';


export const isDev = is.dev();
export const isMac = is.macOS();
export const isWin = is.windows();
export const isLinux = is.linux();

/**
 * 系统消息推送
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
 * 安装依赖项
 * @param {*} 句柄、安装路径、镜像源 
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
 * 创建指定的文件夹
 * @param {*} dirPath 
 */
export const createDir = async (dirPath) => {
    await fse.mkdir(dirPath);
}

/**
 * 写入JSON到文件
 * @param {string} 写入路径 
 * @param {object} 写入JSON对象
 */
export const writeFileJSON = async (jsonPath, obj) => {
    return await fse.writeJSON(jsonPath, obj);
}

/**
 * 读取指定路径下的JSON文件
 * @param {string} 路径 
 */
export const readFileJSON = async (jsonPath) => {
    let ubaPkg = await fse.readJson(jsonPath);
    // console.log(ubaPkg)
    return ubaPkg;
}

/**
 * 打印日志
 * @param {*} 消息 
 */
export const log = (text,flag) => {
    console.log(`[${getNowDate()}] ${text}`);
    if (flag) {
        console.log(text);
    }
    return `[${getNowDate()}] ${text}`;
}

/**
 * 获得主机时间
 */
export const getNowDate = () => {
    let dt = new Date();
    return dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDay() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}
