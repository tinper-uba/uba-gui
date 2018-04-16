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
    buildBtnState: true, //构建按钮状态
    buildBtnLoading: false, //构建中
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
    addLog(data, getState) {
      let devLog = getState().main.devLog;
      let newLog = [];
      newLog.push(data);
      actions.main.save({
        devLog: devLog.concat(newLog)
      });
    }
  }
}
