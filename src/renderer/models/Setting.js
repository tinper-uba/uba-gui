/**
 * @description 设置
 */

import { actions } from 'mirrorx';
  
  export default {
    name: "setting",
    initialState: {
      ubaConfig : {}
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
      getS(data, getState){
        return getState();
      }
    }
  }
  