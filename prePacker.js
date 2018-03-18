/*
  打包前预执行任务
  复制node的二进制文件
*/

const fs = require('fs-extra');
const { join } = require('path');
const target = join(__dirname, 'app', 'nodes');

// console.log(`复制二进制node当前平台：${process.env.RUNOS}`);

// if (process.env.RUNOS === 'darwin') {
//   if (!fs.existsSync(target)) {
//     fs.copySync(join(__dirname, 'nodes', 'mac', 'node'), join(target, 'node'));
//   }
// }

// if (process.env.RUNOS === 'win32') {
//   if (!fs.existsSync(target)) {
//     fs.copySync(
//       join(__dirname, 'nodes', 'win', 'node.exe'),
//       join(target, 'node.exe')
//     );
//   }
// }
