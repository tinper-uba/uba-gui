import { Notification } from 'electron';
import process from 'process';
import co from 'co';
import npminstall from 'npminstall';

export const Info = (title='标题',body='正文') => {
    let info = new Notification({
        title,
        body
    });
    info.show();
}

export const installPkg = ({event,installPath,registry}) => {
    return co(function* () {
    yield npminstall({
      // install root dir
      root: installPath,
      // optional packages need to install, default is package.json's dependencies and devDependencies
      // pkgs: [
      //   { name: 'foo', version: '~1.0.0' },
      // ],
      // install to specific directory, default to root
      // targetDir: '/home/admin/.global/lib',
      // link bin to specific directory (for global install)
      // binDir: '/home/admin/.global/bin',
      // registry, default is https://registry.npmjs.org
      registry: registry,
      // debug: false,
      // storeDir: root + 'node_modules',
      ignoreScripts: true, // ignore pre/post install scripts, default is `false`
      // forbiddenLicenses: forbit install packages which used these licenses
    })
  }).then(()=>{
        event.sender.send('uba::install::success');
        Info('成功','依赖安装完毕');
    }).catch((err)=>{
        event.sender.send('uba::install::error',err);
    });
}