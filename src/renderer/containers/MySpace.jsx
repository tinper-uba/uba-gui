/**
 * 我的工作区容器组件
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import MySpace from '../components/MySpace';
import MySpaceModel from '../models/MySpace';
import { ipcRenderer } from 'electron';



const ipc = ipcRenderer;

mirror.model(MySpaceModel);


mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/my') {
    // ipc.send('uba::checkLocalUbaConfig');
    // actions.my.checkMySpace();
    if (actions.my.checkMySpace().length === 0) {
      //测试用记得删除
      ipc.send('uba::checkLocalUbaConfig2', {
        //uba::view::project2
      });
    }

  }
});




export default connect((state) => state.my)(MySpace);
