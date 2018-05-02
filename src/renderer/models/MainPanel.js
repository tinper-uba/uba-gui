/**
 * @description 主面板模型
 */

import {
  actions
} from 'mirrorx';
import * as api from 'services/MainPanel';

export default {
  name: "main",
  initialState: {
    toolbarHeight: 0, //工具整体的高度
    runProject: '', //要运行和构建的路径
    devLog: [], //uba server 时候的日志
    buildLog: [], //uba build 时候的日志
    devBtnState: false, //调试按钮状态
    devBtnLoading: false, //调试中
    stopBtnState: true, //停止按钮状态
    stopBtnLoading: false, //停止中
    buildBtnLoading: false, //构建状态
    dependenciesTable: [],
    devDependenciesTable: [],
    dependenciesTableLoading: true, //depend loading
    devDependenciesTableLoading: true, //devDepend loading,
    mockTableData: [], //Mock数据的表格数据
    proxyTableData: [], //Proxy数据表格数据

  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      }
    }
  },
  effects: {
    async getRemoteData(data, getState) {
      let msg = await api.get();
      console.log(msg);
    },
    getS(data, getState) {
      return getState();
    },
    addLog(data, getState) {
      let devLog = getState().main.devLog;
      let newLog = [];
      newLog.push(data);
      actions.main.save({
        devLog: devLog.concat(newLog)
      });
    },
    addBuildLog(data, getState) {
      let buildLog = getState().main.buildLog;
      let newLog = [];
      newLog.push(data);
      actions.main.save({
        buildLog: buildLog.concat(newLog)
      });
    }
  }
}
