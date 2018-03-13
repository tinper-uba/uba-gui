/**
 * 主线程入口
 */

import { app, BrowserWindow, Menu, shell, ipcMain, globalShortcut } from 'electron';
import createWindow from './createWindow';
import configureMenu from './menu';
import ipc from './ipc';

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
