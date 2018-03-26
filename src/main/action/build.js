/**
 * @description 构建静态资源
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-24 14:37:01
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html
 */

import { UBA_BIN_PATH } from 'main/path';
import { fork } from 'child_process';
import env from 'main/env';

/**
 * @description 构建静态资源
 * @param {event} event 上层传入ipc
 * @param {string} item.path 启动路径
 */
export default (event, item) => {
    let ubaLog = '';
    let ubaLogErr = '';
    //切换运行目录
    process.chdir(item.path);
    //创建fork线程执行uba build
    const ubabuildTerm = fork(UBA_BIN_PATH, ['build'], {
        cwd: item.path,
        silent: true,
        env,
        detached: true
    });
    ubabuildTerm.stdout.on('data', data => {
        console.log(data.toString())
        ubaLog += data.toString();
        event.sender.send('uba::run::build::on', ubaLog);
    });
    ubabuildTerm.stderr.on('data', data => {
        // console.log('uba-error:' + data);
        ubaLogErr += data;
    });


    return new Promise((resolve, reject) => {
        ubabuildTerm.on('exit', code => {
            console.log('貌似结束了uba build     code : ' + code);
            if (code == 0) {
                resolve({ success: true, code });
                ubaLog += '构建资源服务完成';
                event.sender.send('uba::run::build::on', ubaLog);
                event.sender.send('uba::run::build::end', ubaLog, '构建资源服务完成');
            } else {
                reject({ success: false, code, ubaLogErr });
            }
        });
    });
}
