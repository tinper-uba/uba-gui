/**
 * 空项目容器组件
 */

import React, { Component } from 'react';
import mirror, { actions, connect } from 'mirrorx';
import Init from 'components/Init';
import InitModel from 'models/Init';

mirror.model(InitModel);


mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === '@@router/LOCATION_CHANGE' && location.pathname === '/init') {
    actions.init.loadGithubOrgn();
  }
});




export default connect((state) => state.init)(Init);
