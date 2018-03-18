/**
 * 获得相关系统路径
 */

import { join } from 'path';
import { homedir } from 'os';


export const APP_PATH = __isDev__ ? join(process.cwd(), 'app') : join(process.resourcesPath, 'app');
export const NPM_PATH = join(APP_PATH, 'node_modules', 'npm', 'bin', 'npm-cli.js');
export const UBA_PATH = join(homedir(), '.UbaGui');
export const UBA_CONFIG_PATH = join(homedir(), '.UbaGui','uba-gui.json');
export const NODE_PATH = join(APP_PATH, 'nodes');
export const NPM_BIN_PATH = join(APP_PATH, 'node_modules', '.bin');
export const UBA_BIN_PATH = join(APP_PATH, 'node_modules', 'uba','bin','uba.js');
