import { lt, satisfies, validRange, diff } from 'semver';
import { readJsonSync } from 'fs-extra';
import { join, resolve } from 'path';
import axios from 'axios';
import request from './request';

const getNowDate = () => {
  let dt = new Date();
  return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}

const diffVer = (localVersion, latesetVersion) => {
  return lt(localVersion.toString().replace(/\^|\~/g, ''), latesetVersion)
}

const checkDiff = (latesetVersion, localVersion) => {
  return !satisfies(latesetVersion, `^${localVersion}`);
  //   return diff(latesetVersion, `${localVersion}`);
};

/*
* 获取源上最新版本
* item = {
    name: string,
    installedVersion: string
  }
* registry: url
*/
const checkNpmLatest = async function (item, registry = 'https://registry.npm.taobao.org') {
  const { err, data } = await request(`${registry}/${item.name}/latest`);
  if (!err) {
    item['key'] = data.name;
    item['latest'] = data.version;
    item['name'] = data.name;
    item['homepage'] = data.homepage;
    item['description'] = data.description;
    item['require'] = checkLocalVersion({ name: item.name }, item.path);
  }
  return item;
};

/*
* 获取本地安装版本
* item = {
  name: string,
  version: string
}
*/
const checkLocalVersion = (item, folder) => {

  const pkgPath = join(folder, 'node_modules', item.name, 'package.json');

  try {
    const pkg = readJsonSync(pkgPath);

    return pkg.version;


  } catch (e) {

    console.log(e.message);

    return 'null';
  }
};

export default { getNowDate, checkNpmLatest, checkLocalVersion, checkDiff, satisfies, diffVer };


