/**
 * @description 启动调试服务
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-24 10:42:45
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html
 */

import { UBA_BIN_PATH } from 'main/path';
import { fork } from 'child_process';
import env from 'main/env';
import tasks from 'main/tasks';

/**
 * @description 启动调试服务
 * @param {event} event 上层传入ipc
 * @param {string} item.path 启动路径
 */
export default (event, item) => {
    let ubaLogErr = '';
    //切换运行目录
    process.chdir(item.path);
    //创建fork线程执行uba server
    const ubaserverTerm = fork(UBA_BIN_PATH, ['server', '--noProcess', '--chunks', '--logLevel', 'info'], {
        cwd: item.path,
        silent: true,
        env,
        detached: true
    });
    ubaserverTerm.stdout.on('data', data => {
        console.log(data.toString())
        event.sender.send('uba::run::dev::on', data.toString());
    });
    ubaserverTerm.stderr.on('data', data => {
        console.log('uba-error:' + data);
        ubaLogErr += data;
    });

    tasks.addTasks(ubaserverTerm, item);

    return new Promise((resolve, reject) => {
        ubaserverTerm.on('exit', code => {
            console.log('貌似结束了uba server     code : ' + code);
            if (code == null) {
                resolve({ success: true, code });
                event.sender.send('uba::run::stop::success');
            } else {
                reject({ success: false, code, ubaLogErr });
                event.sender.send('uba::run::stop::error',ubaLogErr);
            }
        });
    });
}
