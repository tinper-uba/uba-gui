/**
 * @description 初始化最佳实践
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:43:52
 * @see https://github.com/uba-templates
 */

import download from 'download-git-repo';
import {log} from 'main/util';

/**
    * @description 下载远端最佳实践
    * @param {string} arg.title 中文脚手架标题
    * @param {string} arg.organization 下载代码组织
    * @param {string} arg.repositories 下载代码仓库
    * @param {string} arg.projectName 文件夹名
    * @param {string} arg.projectPath 文件路径
    * @param {string} arg.npmInstall 是否自动安装
    * @param {string} arg.registry npm镜像源
 */
export default (argv) => {
    let { organization, repositories, projectPath, projectName } = argv;
    log(`start download ${organization}/${repositories}`);
    return new Promise((resolve, reject) => {
        download(`${organization}/${repositories}`, `${projectPath}/${projectName}`, function (err) {
            if (err) {
                reject({ success: false, msg: err });
            } else {
                resolve({ success: true, msg: 'ok' });
            }
        });
    });
}
