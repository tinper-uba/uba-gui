import { shell, ipcMain } from 'electron';

const IPC = () => {
    //打开默认浏览器
    ipcMain.on('uba::openUrl', (event, arg) => {
        shell.openExternal(arg);
        event.sender.send('uba::openUrl::success',true);
    });
}

export default IPC;