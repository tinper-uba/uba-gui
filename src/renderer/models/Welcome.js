import { actions } from 'mirrorx';
import * as api from 'services/Welcome';

export default {
    name: "welcome",
    initialState: {
        list: [],//最佳实践远端数据
        historyProject: [],//本地打开后的历史记录
        selectProject: {//选择后的状态
            title: "请从上面列表中选择"
        }

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
        home() {
            actions.routing.push({
                pathname: '/'
            });
        },
        async getRemoteConfigTemplates(data, getState) {
            let { data: list } = await api.getProjectTemplates();
            actions.welcome.save({ list: list.project });
        },
        setSelectProject(data, getState) {
            actions.welcome.save({ selectProject: data });
        },
        setHistoryProject(data, getState) {
            actions.welcome.save({ historyProject: data });
        }
    }
}