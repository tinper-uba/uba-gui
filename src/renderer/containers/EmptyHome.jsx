/**
 * 空项目容器组件
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import EmptyHome from '../components/EmptyHome';
import EmptyHomeModel from '../models/EmptyHome';

mirror.model(EmptyHomeModel);


mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/bdm/user') {
    actions.user.load();
  }
});




export default connect((state) => state.emptyhome)(EmptyHome);
