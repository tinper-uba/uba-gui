/**
 * @description 初始化
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-23 22:25:01
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain } from 'electron';
import { join } from 'path';
import { log, readFileJSON, writeFileJSON,Info } from 'main/util';
import { UBA_CONFIG_PATH } from 'main/path';
import init from 'main/action/init';


export default () => {
    log('加载模块：初始化最佳实践');
    /**
     * @description uba::init
     * @param {string} arg.title 中文脚手架标题
     * @param {string} arg.organization 下载代码组织
     * @param {string} arg.repositories 下载代码仓库
     * @param {string} arg.projectName 文件夹名
     * @param {string} arg.projectPath 文件路径
     * @param {string} arg.npmInstall 是否自动安装
     * @param {string} arg.registry npm镜像源
     */
    ipcMain.on('uba::init', async (event, arg) => {
        let result = await init(arg);
        if (result.success) {
            //TODO : 写入配置文件，文件路径、工程名即可
            let ubaObj = await readFileJSON(UBA_CONFIG_PATH);
            let item = {
                title: arg.title,
                organization: arg.organization,
                repositories: arg.repositories,
                projectName: arg.projectName,
                projectPath: arg.projectPath,
                registry: arg.registry,
                path: join(arg.projectPath,arg.projectName)
            };
            ubaObj.workSpace.push(item);
            writeFileJSON(UBA_CONFIG_PATH, ubaObj);
            log('项目创建完毕，写入配置文件 发送IPC uba::init::success');
            event.sender.send('uba::init::success', ubaObj.workSpace);
            Info('Uba', '下载成功', `项目「${arg.title}」下载成功`);
        } else {
            Info('Uba', '下载失败', `项目「${arg.title}」下载失败`);
            event.sender.send('uba::init::error');
        }
    });
}