/**
 * @description 使用npminstall包去安装
 * @update 2018-03-31 12:41:40
 */


import { join } from 'path';
import co from 'co';
import npminstall from 'npminstall';
import { Info } from 'main/util';

/**
 * @description uba::install
 * @param {string} argv.title 中文脚手架标题
 * @param {string} argv.organization 下载代码组织
 * @param {string} argv.repositories 下载代码仓库
 * @param {string} argv.projectName 文件夹名
 * @param {string} argv.projectPath 文件路径
 * @param {string} argv.npmInstall 是否自动安装
 * @param {string} argv.registry npm镜像源
 */
export default (event, argv) => {
    let installPath = join(argv.projectPath, argv.projectName);
    process.chdir(installPath);
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
            registry: argv.registry,
            // debug: false,
            // storeDir: root + 'node_modules',
            ignoreScripts: true, // ignore pre/post install scripts, default is `false`
            // forbiddenLicenses: forbit install packages which used these licenses
        })
    }).then(() => {
        event.sender.send('uba::install::success');
        Info('Uba', '安装完毕', '依赖包已经成功下载安装');
    }).catch((err) => {
        event.sender.send('uba::install::error', err);
        Info('Uba', '安装失败', '依赖包可能在下载的时候超时失败了');
    });
}