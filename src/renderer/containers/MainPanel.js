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

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/main') {

  }
});

export default connect((state) => state.main)(MainPanel);
