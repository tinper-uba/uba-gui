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
    //检测是否在公司内网环境，通过npm私有服务判断
    ipc.send('uba::checkNpm', {
      ip: '172.16.75.107',
      port: '8081'
    });
    // TODO:检测是否本地有uba配置文件，如果有读取，如果没有创建空的
    // ipc.send('uba::checkLocalUbaConfig', {
    //   //uba::view::project
    // });
  }
});




export default connect((state) => state.emptyhome)(EmptyHome);
