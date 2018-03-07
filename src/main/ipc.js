import { shell, ipcMain,Notification } from 'electron';

const IPC = () => {
    let myNotification = new Notification({
        title:'测试标题',
        body:'测试的部分'
    });
    //打开默认浏览器
    ipcMain.on('uba::openUrl', (event, arg) => {
        shell.openExternal(arg);
        myNotification.show();
        event.sender.send('uba::openUrl::success',true);
    });
}

export default IPC;