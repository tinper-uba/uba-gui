import { actions } from 'mirrorx';

export default {
    name: "my",
    initialState: {
        workSpace: []
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
        }
    }
}