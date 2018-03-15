
import fixPath from 'fix-path';
import npmRunPath from 'npm-run-path';
import { delimiter, join } from 'path';

import { isWin } from './util';
import { NODE_PATH, NPM_BIN_PATH } from './path';

fixPath();

const npmEnv = npmRunPath.env();
const pathEnv = [process.env.Path, npmEnv.PATH, NODE_PATH, NPM_BIN_PATH]
  .filter(p => !!p)
  .join(delimiter);
const env = { ...npmEnv, FORCE_COLOR: 1 };

if (isWin) {
  env.Path = pathEnv;
} else {
  env.PATH = `${pathEnv}:/usr/local/bin`;
}


export default env;