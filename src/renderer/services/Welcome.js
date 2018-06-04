/**
 * @description 数据请求封装类
 */

import axios from 'axios';

//const remoteUrl = 'http://design.yonyoucloud.com/static/uba/project.json';
const remoteUrl = `http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/project.json?_=${Math.random()}`;
export function getProjectTemplates(){
    return axios.get(remoteUrl);
}