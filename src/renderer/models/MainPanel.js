/**
 * @description 主面板模型
 */

import { actions } from 'mirrorx';
import * as api from 'services/MainPanel';

export default {
    name: "main",
    initialState: {
        toolbarHeight : 0
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
        async getRemoteData(data, getState) {
            let msg = await api.get();
            console.log(msg);
        }
    }
}