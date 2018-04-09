/**
 * @description 一些其他杂乱的IPC消息
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-04-09 15:07:16
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain } from 'electron';
import fs from 'fs';
import { join, basename } from 'path';
import { UBA_CONFIG_PATH } from 'main/path';
import { log, readFileJSON, writeFileJSON, isExistPath } from 'main/util';


export default () => {
    log('加载模块：其他IPC消息加载');
    /**
     * @description uba::config::write
     */
    ipcMain.on('uba::config::write', async (event, runProject) => {
        log('接收到写runProject', runProject);
        let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
        ubaObj['runProject'] = runProject;
        writeFileJSON(UBA_CONFIG_PATH, ubaObj);
        event.sender.send('uba::config::write::success');
    });
    /**
     * @description uba::config::read
     */
    ipcMain.on('uba::config::read', async (event) => {
        log('接收到读取runProject', runProject);
        let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
        event.sender.send('uba::config::read::success', ubaObj['runProject']);
    });
}