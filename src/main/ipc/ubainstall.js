/**
 * @description 安装最佳实践依赖包
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-23 14:02:18
 * @see https://electronjs.org/docs/api/ipc-main
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_fork_modulepath_args_options
 */

import { ipcMain, shell } from 'electron';
import { log } from 'main/util';
import npminstall from 'main/action/npminstall';


export default () => {
    log('加载模块：模块依赖安装器');
    /**
     * @description uba::install
     * @param {event} event 上层IPCMain
     * @param {arg.project} project 文件夹名
     * @param {arg.registry} registry 镜像源
     * @param {arg.upload} upload 文件夹路径
     */
    ipcMain.on('uba::install', async (event, arg) => {
        event.sender.send('uba::install::start');
        let result = await npminstall(event, arg);
        if (result.success) {
            event.sender.send('uba::install::success');
        } else {
            event.sender.send('uba::install::error', result.npmLogErr, result.code);
        }
    });
}