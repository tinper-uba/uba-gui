/**
 * 初始化最佳实践
 */

import download from 'download-git-repo';

/**
 * 下载远端最佳实践
 * @param {*} 仓库信息 
 */
const Init = (argv) => {
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

export default Init;