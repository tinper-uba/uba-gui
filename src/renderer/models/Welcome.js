import { actions } from 'mirrorx';
import * as api from 'services/Welcome';

export default {
    name: "welcome",
    initialState: {
        list: [],//最佳实践远端数据
        historyProject: [],//本地打开后的历史记录
        selectProject: {//选择后的状态
            title: "请从上面列表中选择",//脚手架中文名字
            organization: "",//下载代码组织名字
            repositories: "",//下载代码仓库名字
            preview: ""//脚手架预览图
        },
        setting: {
            projectName: "",//项目名称
            projectPath: "",//项目文件夹路径
            npmInstall: true,//是否自动安装npm包
            registry: "https://registry.npm.taobao.org"//默认的镜像源选择
        },
        initStep: 0, //初始化设置步骤 0=选择工程、1=设置项目、2=安装依赖包
        scaffold: {}//选择脚手架全部对象信息
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
        test(data, getState) {
            let selectProject = { ...getState().welcome.selectProject };
            selectProject.title = data;
            actions.welcome.save({ selectProject: selectProject });
        },
        async getRemoteConfigTemplates(data, getState) {
            let { data: list } = await api.getProjectTemplates();
            actions.welcome.save({ list: list.project });
        },
        //设置选择脚手架信息
        setSelectProject(data, getState) {
            actions.welcome.save({ selectProject: data });
        },
        //设置历史记录数据
        setHistoryProject(data, getState) {
            actions.welcome.save({ historyProject: data });
        },
        //设置steps位置
        setInitStep(data, getState) {
            actions.welcome.save({ initStep: data });
        },
        //设置npm镜像源
        setRegistry(data, getState) {
            //actions.welcome.save({ setting: { registry: data } });
        },
        //设置工程目录
        setProjectPath(data, getState) {
            actions.welcome.save({ projectPath: data });
            // let getS = getState().welcome;
            // getS.setting.projectPath = data;
            // actions.welcome.save({ setting: getS.setting });
        }
    }
}