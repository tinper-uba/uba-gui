/**
 * @description 安装最佳实践依赖包
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-23 14:02:18
 * @see https://electronjs.org/docs/api/ipc-main
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_fork_modulepath_args_options
 */

import { ipcMain, shell } from 'electron';
import { log,Info } from 'main/util';
// import npminstall from 'main/action/npminstall';
import npminstall from 'main/action/install';



export default () => {
    log('加载模块：模块依赖安装器');
    /**
     * @description uba::install
     * @param {string} argv.title 中文脚手架标题
     * @param {string} argv.organization 下载代码组织
     * @param {string} argv.repositories 下载代码仓库
     * @param {string} argv.projectName 文件夹名
     * @param {string} argv.projectPath 文件路径
     * @param {string} argv.npmInstall 是否自动安装
     * @param {string} argv.registry npm镜像源
     */
    ipcMain.on('uba::install', (event, arg) => {
        event.sender.send('uba::install::start');
        npminstall(event, arg);
    });
}