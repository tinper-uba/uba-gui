/**
 * @description 打开本机默认浏览器
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 15:50:34
 * @see https://electronjs.org/docs/api/shell
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain, shell } from 'electron';
import { log } from 'main/util';


export default () => {
    log('加载模块：打开本机浏览器');
    /**
     * @description uba::openUrl
     * @param {string} url 网址
     */
    ipcMain.on('uba::openUrl', (event, url) => {
        shell.openExternal(url);
    });
}