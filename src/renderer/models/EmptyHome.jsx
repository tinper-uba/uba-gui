import { actions } from 'mirrorx';

export default {
    name: "emptyhome",
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