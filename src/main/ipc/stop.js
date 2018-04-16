/**
 * @description 结束任务
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-24 10:03:23
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain } from 'electron';
import { log } from 'main/util';
import tasks from 'main/tasks';

export default () => {
    log('加载模块：结束任务指令');
    /**
     * @description uba::run::stop
     * @param {string} item Item
     */
    ipcMain.on('uba::run::stop', (event, item) => {
        if (tasks.killTasksPath(item.path)) {
            //任务成功杀死发送消息
            // event.sender.send('uba::run::stop::success');
        } else {
            //任务操作失败，是由于路径错误没有找到任务
            event.sender.send('uba::run::stop::error');
        }
    });
}