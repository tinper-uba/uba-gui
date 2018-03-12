import { join } from 'path';
import { homedir } from 'os';


export const APP_PATH = __isDev__ ? join(process.cwd(), 'app') : join(process.resourcesPath, 'app');
export const NPM_PATH = join(APP_PATH, 'node_modules', 'npm', 'bin', 'npm-cli.js');