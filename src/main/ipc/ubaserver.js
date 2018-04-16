/**
 * @description 调试服务
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-24 13:34:14
 * @see https://electronjs.org/docs/api/ipc-main
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_fork_modulepath_args_options
 */

import { ipcMain, shell } from 'electron';
import { log } from 'main/util';
import devserver from 'main/action/devserver';


export default () => {
    log('加载模块：调试服务');
    /**
     * @description 开启调试服务
     * @param {event} event IPC消息
     * @param {item} item 项目项 
     */
    ipcMain.on('uba::run::dev', async (event, item) => {
        log(`接收启动调试消息 调试目录 ${item.path}`);
        let result = await devserver(event, item);
        if (result.success) {
            // event.sender.send('uba::run::stop::success');
        }else{
            // event.sender.send('uba::run::stop::error');
        }
    });
}