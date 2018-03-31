/**
 * @description 打开本地文件夹
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-23 16:00:46
 * @see https://electronjs.org/docs/api/dialog
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain, dialog } from 'electron';
import { log,setLastPath } from 'main/util';


export default () => {
    log('加载模块：选择最佳实践的对话框');
    /**
     * @description uba::openProject
     * @returns {string} path 选择的路径
     */
    ipcMain.on('uba::openProject', (event) => {
        let path = dialog.showOpenDialog({ properties: ['openDirectory'] });
        console.log(path);
        if (path && path.length !== 0) {
            setLastPath(path[0]);
            event.sender.send('uba::openProject::success', path[0]);
        }
    });
}