/**
 * 主面板容器
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import MainPanel from '../components/MainPanel';
import MainPanelModel from '../models/MainPanel';
import { ipcRenderer } from 'electron';

const ipc = ipcRenderer;

mirror.model(MainPanelModel);
ipc.on('uba::get::config::success::mainpanel', (event, config) => {
  let ubaConfig = config.runProject;
  actions.main.save({
    runProject: ubaConfig
  });
});
mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if ((action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/main/mock') || action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/main/resource') {
    ipc.send('uba::get::config', 'mainpanel');
  }
});



export default connect((state) => state.main)(MainPanel);
