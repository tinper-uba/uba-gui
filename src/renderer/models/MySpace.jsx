import { actions } from 'mirrorx';

export default {
    name: "my",
    initialState: {
        workSpace: [],
        cmdLine : "当前初始化完成，等待操作。"
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
        home(data, getState) {
            actions.routing.push({
                pathname: '/'
            });
        },
        /**
         * 设置工作空间项目
         * @param {*} data 
         * @param {*} getState 
         */
        setWorkSpace(data, getState) {
            actions.my.save({
                workSpace : data
            });
        },
        checkMySpace(data, getState){
            let {workSpace} = getState().my;
            return workSpace;
        },
        setCmdLog(log,getState){
            actions.my.save({
                cmdLine : log
            });
        }
    }
}