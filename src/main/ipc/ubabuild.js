/**
 * @description 构建资源
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-24 14:26:11
 * @see https://electronjs.org/docs/api/shell
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain, shell } from 'electron';
import { log } from 'main/util';
import build from 'main/action/build';


export default () => {
    log('加载模块：资源构建');
    /**
     * @description uba::run::build
     * @param {string} item.path 构建的路径
     */
    ipcMain.on('uba::run::build', (event, item) => {
        log(`接收构建消息 构建目录 ${item.path}`);
        build(event, item);
    });
}