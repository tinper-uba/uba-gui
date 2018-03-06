import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';
import { format } from 'url';

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 500,
    center: true,
    resizable: false,
    alwaysOnTop: false,
    frame: false,
    titleBarStyle: 'hiddenInset',
    skipTaskbar: false
  });
  // and load the index.html of the app.

  if (__isDev__) {
    win.loadURL('http://localhost:9000/index.html');
    // Open the DevTools.
    win.webContents.openDevTools();
  } else {
    win.loadURL(format({
      pathname: resolve(process.resourcesPath, 'app/renderer/index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
