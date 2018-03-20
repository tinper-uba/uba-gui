/**
 * 主线程入口
 */

import { app, BrowserWindow, Menu, shell, ipcMain, globalShortcut } from 'electron';
import * as t from './term';
import createWindow from './createWindow';
import configureMenu from './menu';
import ipc from './ipc';
import tasks from './tasks';

let win;

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

app.on('ready', onReady);

app.on('will-quit', (event) => {
  t.killAllTerm();
});
app.on('quit', (event) => {
  t.killAllTerm();
});
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  t.killAllTerm();
  app.quit();
});

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
global.app = app;