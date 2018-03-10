import { actions } from 'mirrorx';
import { ipcRenderer } from 'electron';
import * as api from 'services/Init';

const ipc = ipcRenderer;


export default {
    name: "init",
    initialState: {
        currStep: 0,
        repoData: [],
        selectId: '',
        selectName: '',
        project: '',
        upload: '',
        registry: ''
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
        clear() {
            actions.init.save({
                selectId: '',
                selectName: ''
            });
        },
        setStep(page, getState) {
            let { currStep } = getState().init;
            let nextStep = currStep + 1;
            if (typeof page) {
                nextStep = page;
            }
            actions.init.save({ currStep: nextStep });
        },
        selectTemplate(obj, getState) {
            let { selectId, selectName } = obj;
            actions.init.save({ selectId, selectName });
        },
        async loadGithubOrgn() {
            let { data } = await api.get();
            actions.init.save({ repoData: data });
            return data;
        },
        setSetting(data, getState) {
            actions.init.save({ ...data });
            actions.init.setStep(2);
            let registry = actions.init.getS().registry;
            // ipc.send('uba::openUrl', registry);
        },
        setUpload(data, getState) {
            actions.init.save({ upload: data });
        },
        getS(data, getState) {
            return getState().init;
        },
        downGit(cb, getState) {
            let { selectName, project, upload } = getState().init;
            // console.log(getState().init);
            ipc.send('uba::init', { selectName, project, upload });
            
        },
        install(data, getState) {
            let { registry, project, upload } = getState().init;
            console.log(registry, project, upload);
            ipc.send('uba::install', { registry, upload, project });
        }
    }
}