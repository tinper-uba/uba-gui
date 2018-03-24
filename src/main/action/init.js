/**
 * @description 初始化最佳实践
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:43:52
 * @see https://github.com/uba-templates
 */

import download from 'download-git-repo';

/**
 * @description 下载远端最佳实践
 * @param {string} argv.project 下载到指定的文件夹
 * @param {string} argv.selectName 仓库信息uba-templates repo
 * @param {string} argv.upload 指定路径客户端传来的本机不同平台
 */
export default (argv) => {
    let { project, selectName, upload } = argv;
    console.log(`start download ${selectName}`);
    return new Promise((resolve, reject) => {
        download(`uba-templates/${selectName}`, `${upload}/${project}`, function (err) {
            if (err) {
                reject({ success: false, msg: err });
            } else {
                resolve({ success: true, msg: 'ok' });
            }
        });
    });
}
