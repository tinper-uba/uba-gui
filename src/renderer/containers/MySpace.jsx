/**
 * 我的工作区容器组件
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import MySpace from '../components/MySpace';
import MySpaceModel from '../models/MySpace';


mirror.model(MySpaceModel);


mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/my') {

  }
});




export default connect((state) => state.my)(MySpace);
