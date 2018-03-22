/**
 * @description 运行任务类操作
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:09:15
 * @see http://es6.ruanyifeng.com/#docs/set-map
 */


/**
 * @constructor 任务终端类
 */
class Tasks {
    /**
     * 单例模式
     */
    static created = false;
    /**
     * 保存任务的静态对象
     */
    static tasks = null;
    /**
     * @description 任务操作类
     */
    constructor() {
        if (!Tasks.created) {
            Tasks.tasks = new Map();
            Tasks.created = true;
        }
    }
    /**
     * @description 添加一个独一无二的终端
     * @returns 返回：true 添加成功 false 添加失败已存在
     * @param {*} term 终端
     * @param {*} item 配置
     */
    addTasks(term, item) {
        if (!Tasks.tasks.has(item.path)) {
            Tasks.tasks.set(item.path, term);
            return true;
        }
        return false;
    }
    /**
     * @description 通过path获得当前任务终端
     * @param {*} path 执行路径
     * @returns null 没有找到 否则返回终端
     */
    getTasks(path) {
        if (Tasks.tasks.has(path)) {
            return Tasks.tasks.get(path);
        }
        return null;
    }
    /**
     * @description 删除指定路径下的运行终端
     * @param {*} path 删除的路径
     * @returns true 删除成功 false 删除失败
     */
    removeTasks(path) {
        return Tasks.tasks.delete(path);
    }
    /**
     * @description 获得当前运行任务数
     * @returns number 任务数量
     */
    getTasksCounts() {
        return Tasks.tasks.size;
    }
    /**
     * @description 获得所有任务终端
     * @returns Map
     */
    getAllTasks() {
        return Tasks.tasks;
    }
    /**
     * @description 杀死所有任务进程
     */
    killAllTasks() {
        for (let term of Tasks.tasks.values()) {
            term.kill();
        }
        Tasks.tasks.clear();
    }
    /**
     * @description 杀死进程指定path
     * @param {*} path 结束任务的路径
     * @returns true 成功结束 false 失败没有找到
     */
    killTasksPath(path) {
        if (Tasks.tasks.has(path)) {
            Tasks.tasks.get(path).kill();
            this.removeTasks(path);
            return true;
        }else{
            return false
        }
    }
}

export default new Tasks();