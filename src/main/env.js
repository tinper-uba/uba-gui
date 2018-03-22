/**
 * @description 系统环境变量
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 13:40:02
 */

import fixPath from 'fix-path';
import npmRunPath from 'npm-run-path';
import { delimiter, join } from 'path';
import { isWin } from './util';
import { NPM_BIN_PATH } from './path';

//修复path
fixPath();
//获取npm运行相关路径
const npmEnv = npmRunPath.env();
//按照不同平台环境变量去组织参数
const pathEnv = [process.env.Path, npmEnv.PATH, NPM_BIN_PATH]
  .filter(p => !!p)
  .join(delimiter);
const env = { ...npmEnv };

if (isWin) {
  env.Path = pathEnv;
} else {
  env.PATH = `${pathEnv}:/usr/local/bin`;
}


export default env;