import { Notification } from 'electron';
// import co from 'co';
// import npminstall from 'npminstall';

export const Info = (title='标题',body='正文') => {
    let info = new Notification({
        title,
        body
    });
    info.show();
}