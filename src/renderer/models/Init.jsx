import { actions } from 'mirrorx';

export default {
    name: "init",
    initialState: {

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
        init() {
            actions.routing.push({
                pathname: '/init'
            });
        }
    }
}