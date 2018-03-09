import spawn from 'cross-spawn';
import process from 'process';
import {resolve} from 'path';
import { Notification } from 'electron';


const Install = (event, argv) => {
  console.log('npm install', argv);
  process.chdir(resolve(argv.upload,argv.project));
  const child = spawn('npm', ['install', '-r',argv.registry]);
  child.stdout.on('data', (chunk) => {
    let chk = (new Buffer(chunk, 'base64').toString());
    console.log(chk);
    event.sender.send('uba::install::data', chk);
  });
  child.stdout.on('end', () => {
    console.log('end!');
    event.sender.send('uba::install::end');
  });
  child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    event.sender.send('uba::install::close',code);
    new Notification({
        title: '完成',
        body: `项目依赖安装成功!`
    }).show();
  });
  child.on('error', (err) => {
    console.log('Failed to start subprocess.');
    event.sender.send('uba::install::error',err);
  });
}

export default Install;
