/**
 * @description 初始化
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-23 22:25:01
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain } from 'electron';
import {join} from 'path';
import { log,readFileJSON,writeFileJSON } from 'main/util';
import { UBA_CONFIG_PATH } from 'main/path';
import init from 'main/action/init';


export default () => {
    log('加载模块：初始化最佳实践');
    /**
     * @description uba::init
     * @param {string} arg.project 目录名
     * @param {string} arg.selectName 最佳实践名字
     * @param {string} arg.upload 文件路径
     */
    ipcMain.on('uba::init', async (event, arg) => {
        let result = await init(arg);
        if (result.success) {
            //TODO : 写入配置文件，文件路径、工程名即可
            let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
            let item = {
                title: arg.project,
                template: arg.selectName,
                path: join(arg.upload, arg.project)
            };
            ubaObj.workSpace.push(item);
            writeFileJSON(UBA_CONFIG_PATH, ubaObj);
            log('项目创建完毕，写入配置文件 发送IPC uba::init::success');
            event.sender.send('uba::init::success', ubaObj.workSpace);
        } else {
            Info('Uba', '下载失败', `项目「${arg.project}」下载失败`);
            event.sender.send('uba::init::error');
        }
    });
}