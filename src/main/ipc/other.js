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
}