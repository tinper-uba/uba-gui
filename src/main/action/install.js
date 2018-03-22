/**
 * @description npm依赖包安装
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:58:51
 */


import { resolve } from 'path';
import { Notification } from 'electron';
import { Info, installPkg } from '../util';


/**
 * @todo 待更换原版npm解决压缩出错的问题
 * @description 安装依赖
 * @param {event} event 上层传入ipc
 * @param {string} argv.upload 安装路径
 * @param {string} argv.project 安装文件夹
 * @param {string} argv.registry 镜像源
 */
const Install = async (event, argv) => {
  let installPath = resolve(argv.upload, argv.project);
  //切换当前路径
  process.chdir(installPath);
  //等待安装过程，需要把过程在这里解析
  await installPkg({
    event,
    installPath,
    registry: argv.registry
  });
}

export default Install;
