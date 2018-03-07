import { app, BrowserWindow, Menu, shell, ipcMain } from 'electron';
import createWindow from './createWindow';
import configureMenu from './menu';
import ipc from './ipc';

let win;

const onReady = () => {
  win = createWindow();
  const menu = Menu.buildFromTemplate(configureMenu({ app }));
  Menu.setApplicationMenu(menu);
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
