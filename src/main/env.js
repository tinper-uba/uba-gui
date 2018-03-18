
import fixPath from 'fix-path';
import npmRunPath from 'npm-run-path';
import { delimiter, join } from 'path';

import { isWin } from './util';
import { NPM_BIN_PATH } from './path';

fixPath();

const npmEnv = npmRunPath.env();
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