import { lt, satisfies, validRange, diff } from 'semver';
import { readJsonSync, writeJsonSync } from 'fs-extra';
import { join, resolve } from 'path';
import uuid from 'uuid';
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
  return !satisfies(latesetVersion, `${localVersion}`);
  //   return diff(latesetVersion, `${localVersion}`);
};


// {
//       key: '3',
//       name: 'lalala',
//       require: '~2.2.6',
//       latest: '2.4.0',
//       define:'^2.1.0'
//   }
const loadDependenciesPackage = async (runProject, registry = 'https://registry.npm.taobao.org') => {
  let pkgs = readJsonSync(resolve(runProject, 'package.json'));
  const allPkg = {};
  let dependenciesArr = await Promise.all(
    Object.keys(pkgs.dependencies).map(async (name) => {
      let { err, data } = await request(`${registry}/${name}/latest`);
      let item = {};
      if (!err) {
        item['key'] = data.name;
        item['latest'] = data.version;
        item['name'] = data.name;
        item['homepage'] = `https://www.npmjs.com/package/${data.name}/`;
        item['description'] = data.description;
        item['require'] = checkLocalVersion({ name }, runProject);
        item['define'] = pkgs.dependencies[name];
        item['mode'] = '--save';
      } else {
        item['key'] = uuid();
        item['latest'] = '-';
        item['name'] = name;
        item['homepage'] = `https://www.npmjs.com/package/${name}/`;
        item['description'] = '-';
        item['require'] = '-';
        item['define'] = pkgs.dependencies[name];
        item['mode'] = '--save';
      }
      return item;
    })
  );
  let devDependenciesArr = await Promise.all(
    Object.keys(pkgs.devDependencies).map(async (name) => {
      let { err, data } = await request(`${registry}/${name}/latest`);
      let item = {};
      if (!err) {
        item['key'] = data.name;
        item['latest'] = data.version;
        item['name'] = data.name;
        item['homepage'] = `https://www.npmjs.com/package/${data.name}/`;
        item['description'] = data.description;
        item['require'] = checkLocalVersion({ name }, runProject);
        item['define'] = pkgs.devDependencies[name];
        item['mode'] = '--save-dev';
      } else {
        item['key'] = uuid();
        item['latest'] = '-';
        item['name'] = name;
        item['homepage'] = `https://www.npmjs.com/package/${name}/`;
        item['description'] = '-';
        item['require'] = '-';
        item['define'] = pkgs.devDependencies[name];
        item['mode'] = '--save-dev';
      }
      return item;
    })
  );
  // console.log(dependenciesArr);
  allPkg.dependencies = dependenciesArr;
  allPkg.devDependencies = devDependenciesArr;
  return allPkg;
}

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
    item['define'] = checkLocalVersion({ name: item.name }, item.path);
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
    return '0.0.0';
  }
};
/**
 * 获取当前运行项目目录下的package.json
 */
const getLocalPkgs = (folder) => {
  let pkgs = readJsonSync(resolve(folder, 'package.json'));
  let newPkg = {};
  let dependencies = Object.keys(pkgs.dependencies).map(name => ({ name, defineVersion: pkgs.dependencies[name] }));
  newPkg['dependencies'] = dependencies;
  let devDependencies = Object.keys(pkgs.devDependencies).map(name => ({ name, defineVersion: pkgs.devDependencies[name] }));
  newPkg['devDependencies'] = devDependencies;
  return newPkg;
}

const getUbarc = (folder) => {
  try {
    return readJsonSync(resolve(folder, '.ubarc'));
  } catch (error) {
    console.error(error);
  }
}

const setUbarc = (folder, key, value) => {
  try {
    let UbaRcPath = resolve(folder, '.ubarc');
    let UbaRcFile = readJsonSync(UbaRcPath);
    UbaRcFile[key] = value;
    writeJsonSync(UbaRcPath,UbaRcFile,{
      spaces : 2
    });
    return true;
  } catch (error) {
    console.error(error);
  }
}

export default { setUbarc, getUbarc, loadDependenciesPackage, getLocalPkgs, getNowDate, checkNpmLatest, checkLocalVersion, checkDiff, satisfies, diffVer };


