/**
 * Setting容器
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import path from 'path';
import { readFileSync } from 'fs-extra';
import Setting from '../components/Setting';
import SettingModel from '../models/Setting';
import { ipcRenderer } from 'electron';
import util from 'common';

const ipc = ipcRenderer;

//uba::get::config::success::
ipc.on('uba::get::config::success::setting', (event,config) => {
  let ubaConfig = path.join(config.runProject,'uba.config.js');
});

mirror.model(SettingModel);

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/main/setting') {
    ipc.send('uba::get::config','setting');
  }
});



export default connect((state) => state.setting)(Setting);
