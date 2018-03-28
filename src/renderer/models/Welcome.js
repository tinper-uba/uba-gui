import { actions } from 'mirrorx';
import * as api from 'services/Welcome';

export default {
    name: "welcome",
    initialState: {
        list: [],
        selectProject: ""
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
        async getRemoteConfigTemplates(){
            let {data : list} = await api.getProjectTemplates();
            actions.welcome.save({list:list.project});
        }
    }
}