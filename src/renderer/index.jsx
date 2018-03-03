import React from 'react';
import mirror, { render } from 'mirrorx';


import App from './App';
import './index.less';

mirror.defaults({
    historyMode: 'hash'
});

render(<App />, document.querySelector('#app'));