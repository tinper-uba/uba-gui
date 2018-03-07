import { actions } from 'mirrorx';
import * as api from 'services/Init';


export default {
    name: "init",
    initialState: {
        currStep: 0,
        repoData: []
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
        init(data, getState) {
            actions.routing.push({
                pathname: '/init'
            });
        },
        setStep(page, getState) {
            console.log(getState());
            let { currStep } = getState().init;
            let nextStep = currStep + 1;
            actions.init.save({ currStep: nextStep });
        },
        async loadGithubOrgn() {
            let { data } = await api.get();
            actions.init.save({ repoData: data });
            console.log(data);
            return data;
        }
    }
}