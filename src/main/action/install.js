// import spawn from 'cross-spawn';
import process from 'process';
import {resolve} from 'path';
import { Notification } from 'electron';
// import npminstall from 'npminstall';
// import co from 'co';
import {Info} from '../util';



const Install = (event, argv) => {
  let installPath = resolve(argv.upload,argv.project);
  process.chdir(installPath);

  // co(function* () {
  //   yield npminstall({
  //     // install root dir
  //     root: installPath,
  //     // optional packages need to install, default is package.json's dependencies and devDependencies
  //     // pkgs: [
  //     //   { name: 'foo', version: '~1.0.0' },
  //     // ],
  //     // install to specific directory, default to root
  //     // targetDir: '/home/admin/.global/lib',
  //     // link bin to specific directory (for global install)
  //     // binDir: '/home/admin/.global/bin',
  //     // registry, default is https://registry.npmjs.org
  //     registry: 'https://registry.npm.taobao.org/',
  //     // debug: false,
  //     // storeDir: root + 'node_modules',
  //     ignoreScripts: true, // ignore pre/post install scripts, default is `false`
  //     // forbiddenLicenses: forbit install packages which used these licenses
  //   });
  // }).catch(err => {
  //   console.error(err.stack);
  // }).then(()=>{
  //   console.log('应该完成了');
  //   Info('完成','依赖包安装完成');
  // });




  // const child = spawn('npm', ['install', '-r',argv.registry]);
  // child.stdout.on('data', (chunk) => {
  //   let chk = (new Buffer(chunk, 'base64').toString());
  //   console.log(chk);
  //   event.sender.send('uba::install::data', chk);
  // });
  // child.stdout.on('end', () => {
  //   console.log('end!');
  //   event.sender.send('uba::install::end');
  // });
  // child.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });
  // child.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  //   event.sender.send('uba::install::close',code);
  //   new Notification({
  //       title: '完成',
  //       body: `项目依赖安装成功!`
  //   }).show();
  // });
  // child.on('error', (err) => {
  //   console.log('Failed to start subprocess.');
  //   event.sender.send('uba::install::error',err);
  // });
}

export default Install;
