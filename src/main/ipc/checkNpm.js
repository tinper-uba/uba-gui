/**
 * @description 检测当前主机运行是否在内网npm下
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 15:43:17
 * @see https://www.npmjs.com/package/tcp-ping
 * @see https://electronjs.org/docs/api/ipc-main
 */

import { ipcMain } from 'electron';
import { log } from 'main/util';
import Ping from 'tcp-ping';


export default () => {
    log('加载模块：内网npm镜像源检测');
    /**
     * @description uba::checkNpm
     * @param {string} arg.ip 检测的主机
     * @param {number} arg.host 检测的端口
     * @returns true=在内网 false=不在内网
     * @description 客户端接收：uba::checkNpm::success
     */
    ipcMain.on('uba::checkNpm', (event, arg) => {
        Ping.probe(arg.ip, arg.port, function (err, available) {
            event.sender.send('uba::checkNpm::success', available);
        });
    });
}