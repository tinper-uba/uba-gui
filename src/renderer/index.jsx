import React from 'react';
import mirror, { render } from 'mirrorx';
import App from './App';

mirror.defaults({
    historyMode: 'hash'
});

render(<App />, document.querySelector('#root'));