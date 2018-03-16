let currRunTerm = [];

export const addTerm = (term, item) => {
    currRunTerm.push({
        term,
        item
    });
}

export const killAllTerm = () => {
    for (let i = 0; i < currRunTerm.length; i++) {
        currRunTerm[i].term.kill();
    }
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