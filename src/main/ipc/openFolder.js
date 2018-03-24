/**
 * @description 资源定位
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-24 14:21:18
 * @see https://electronjs.org/docs/api/shell
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain, shell } from 'electron';
import { log } from 'main/util';


export default () => {
    log('加载模块：资源定位');
    /**
     * @description uba::open::folder
     * @param {string} url 打开文件夹路径
     */
    ipcMain.on('uba::open::folder', (event, url) => {
        shell.showItemInFolder(url);
    });
}