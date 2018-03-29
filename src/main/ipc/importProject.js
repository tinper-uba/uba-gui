/**
 * @description 导入存在uba工程
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 15:58:25
 * @see https://electronjs.org/docs/api/ipc-main
 * @see https://electronjs.org/docs/api/dialog
 */

import { ipcMain, dialog } from 'electron';
import fs from 'fs';
import { join, basename } from 'path';
import { UBA_CONFIG_PATH } from 'main/path';
import { log, readFileJSON, writeFileJSON, isExistPath } from 'main/util';


export default () => {
    log('加载模块：uba项目导入');
    /**
     * @description uba::import
     * @returns {object} workSpace 工作区
     */
    ipcMain.on('uba::import', (event) => {
        log('执行项目导入操作');
        let projectPath = dialog.showOpenDialog({ properties: ['openDirectory'] });
        log(`打开的工程路径：${projectPath}`);
        if (projectPath && projectPath.length !== 0) {
            fs.readFile(join(projectPath[0], 'uba.config.js'), 'utf-8', async (err, data) => {
                if (err) {
                    event.sender.send('uba::import::error', '无效的uba前端工程');
                } else {
                    log('找到有效的uba工程，写入配置文件，参数不全');
                    let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
                    let item = {
                        title: basename(projectPath[0]),
                        template: "自行导入不存在",
                        path: join(projectPath[0])
                    };
                    //检测不许重复导入
                    if (!isExistPath(ubaObj.workSpace, item.path)) {
                        ubaObj.workSpace.push(item);
                        writeFileJSON(UBA_CONFIG_PATH, ubaObj);
                        event.sender.send('uba::import::success', ubaObj.workSpace);
                    } else {
                        event.sender.send('uba::import::error', '不能重复导入已存在的工程');
                    }
                }
            });
        }
    });
}