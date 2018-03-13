/**
 * 空项目容器组件
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import EmptyHome from '../components/EmptyHome';
import EmptyHomeModel from '../models/EmptyHome';


import { ipcRenderer } from 'electron';



const ipc = ipcRenderer;


mirror.model(EmptyHomeModel);


mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/') {
    ipc.send('uba::checkNpm', {
      ip: '172.16.75.107',
      port: '8081'
    });
  }
});




export default connect((state) => state.emptyhome)(EmptyHome);
