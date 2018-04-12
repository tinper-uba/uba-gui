/**
 * @description 检查本地uba配置文件读写等
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 15:43:17
 * @see https://www.npmjs.com/package/tcp-ping
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain } from 'electron';
import fs from 'fs';
import { log, createDir, getNowDate, writeFileJSON, readFileJSON } from 'main/util';
import { UBA_CONFIG_PATH, UBA_PATH } from 'main/path';


export default () => {
    log('加载模块：检查本地uba配置文件');
    /**
     * @description uba::checkLocalUbaConfig
     * @param {event} event IPC
     */
    ipcMain.on('uba::checkLocalUbaConfig', async (event) => {
        log('开始检测uba本地配置文件');
        //检测uba配置文件是否存在
        if (fs.existsSync(UBA_CONFIG_PATH)) {
            //存在，进行读取操作，切换视图
            log('uba配置存在，读取显示工作区并切换组件');
            //读取项目数据用于发送到前端组件state
            let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
            event.sender.send('uba::view::project', ubaObj.workSpace,ubaObj.lastPath);
        } else {
            log('uba配置不存在，创建配置文件');
            //不存在，创建新的配置文件等待下一次读取
            let ubaObj = {
                name: "uba-gui",
                time: getNowDate(),
                title:"",
                runProject:"",
                lastPath: "",
                workSpace: []
            };
            //创建uba文件夹
            createDir(UBA_PATH);
            //写入配置默认文件
            try {
                writeFileJSON(UBA_CONFIG_PATH, ubaObj);
                log('创建配置文件写入成功')
            } catch (error) {
                log(error)
            }
        }
    });
}