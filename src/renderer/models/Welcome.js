import { actions } from 'mirrorx';

export default {
    name: "welcome",
    initialState: {
        list: []
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
        }
    }
}