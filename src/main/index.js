/**
 * @description 主线程
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:02:14
 * @see http://usejsdoc.org/
 * @see https://electronjs.org/docs/api/browser-window
 * @see https://electronjs.org/docs/api/app
 * @see https://electronjs.org/docs/api/ipc-main
 * @see https://electronjs.org/docs/api/shell
 * @see https://electronjs.org/docs/api/menu
 */

import { app, BrowserWindow, Menu, shell, ipcMain, globalShortcut } from 'electron';
import createWindow from './createWindow';
import configureMenu from './menu';
import ipc from './ipc';
import tasks from './tasks';

let win;

/**
 * @description 初始化窗口等相关
 */
const onReady = () => {
  win = createWindow();
  if (!__isDev__) {
    const menu = Menu.buildFromTemplate(configureMenu({ app }));
    Menu.setApplicationMenu(menu);
  }
  // 启动调试工具
  globalShortcut.register('CmdOrCtrl+Shift+8', () => {
    win.webContents.toggleDevTools();
  });
  ipc();
}

//当 Electron 完成初始化时被触发
app.on('ready', onReady);
//当所有窗口都已关闭并且应用程序将退出时发出
app.on('will-quit', (event) => {
  //杀死所有任务
  tasks.killAllTasks();
});
//在应用程序退出时发出
app.on('quit', (event) => {
  //杀死所有任务
  tasks.killAllTasks();
});
//当所有的窗口都被关闭时触发
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  tasks.killAllTasks();
  //本体退出
  app.quit();
});
//当激活electron窗体的时候，紧支持MacOS
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
  win.show();

  console.log(`当前运行任务数量：${tasks.getTasksCounts()}`);
  for (let value of tasks.getAllTasks().values()) {
    console.log(`PID：${value.pid}`);
  }

});
//全局挂载供渲染进程使用
global.app = app;