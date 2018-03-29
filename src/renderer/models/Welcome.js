import { actions } from 'mirrorx';
import * as api from 'services/Welcome';

export default {
    name: "welcome",
    initialState: {
        list: [],
        historyProject: [],
        selectProject: {
            title: "空"
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