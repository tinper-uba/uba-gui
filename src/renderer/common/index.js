import { lt, satisfies, validRange, diff } from 'semver';
import { readJsonSync } from 'fs-extra';
import { join } from 'path';
import axios from 'axios';
import request from 'request';

// nodeFetch('http://www.qq.com');
const getNowDate = () => {
  let dt = new Date();
  return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}

const diffVer = (localVersion,latesetVersion) => {
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
const checkNpmLatest = async function (item, registry='https://registry.npmjs.com') {
  const obj = await request(`${registry}/${item.name}/latest`);
  console.log(obj);
  // if (!err) {
  //   console.log(data);
  // }
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

    return { ...item, installedVersion: pkg.version };

    // return Object.assign(item, { installedVersion: pkg.version });

  } catch (e) {

    console.log(e.message);

    return {...item, installedVersion: 'null'};
  }
};

export default { getNowDate,checkNpmLatest, checkLocalVersion, checkDiff, satisfies,diffVer };


