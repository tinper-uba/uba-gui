
import { ipcMain, session } from 'electron';
import { log } from 'main/util';

export default () => {
    log('加载模块：测试');
    /**
     * @description uba::run::stop
     * @param {string} item Item
     */
    ipcMain.on('uba::test', (event) => {
        log('接收到uba::test');
        session.defaultSession.cookies.get({ url: 'https://mock.yonyoucloud.com/' }, (error, cookies) => {
            // console.log(error, cookies);
            for (let i = 0; i < cookies.length; i++) {
                console.log(cookies[i].name, '=', cookies[i].value);
            }
            event.sender.send('uba::test::end', cookies);
        });
        //_yapi_token
        // session.defaultSession.cookies.set({url:'https://mock.yonyoucloud.com/',name:'_yapi_token',value:''},(error)=>{
        //     console.log(error)
        // });
    });
}