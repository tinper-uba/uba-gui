import { isWin } from './util';
import { exec } from 'child_process';
import env from './env';

let currRunTerm = [];

export const addTerm = (term, item) => {
    currRunTerm.push({
        term,
        item
    });
}

export const killAllTerm = () => {
    for (let i = 0; i < currRunTerm.length; i++) {
        if (currRunTerm[i].term) {
            currRunTerm[i].term.kill();
            if (isWin) {
                //TODO : 杀死windows进程 
                killOnecProcessPid(currRunTerm[i].term.pid);
            }
        }
    }
}

export const killOnecProcessPid = (pid) => {
    exec(`taskkill /pid ${pid} /T /F`, {
        env
    }, (code) => {
        console.log(`貌似杀人了... code:${code}`);
    })
}

export const killOneTerm = (path) => {
    for (let i = 0; i < currRunTerm.length; i++) {
        currRunTerm[i].term.kill();
        if (path == currRunTerm[i].item.path) {
            currRunTerm[i].term.kill();
        }
    }
}

export const getTermAllCount = () => {
    return currRunTerm.length;
}

export const getTermAll = () => {
    return currRunTerm;
}

