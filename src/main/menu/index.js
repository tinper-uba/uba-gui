/**
 * @description 菜单
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:43:52
 * @see https://electronjs.org/docs/api/menu
 */


import uba from './uba';

/**
 * @description 菜单配置项
 * @param {object} 需要挂载的app 
 */
export default function configureMenu({ app }) {
    let template = process.platform === 'darwin' ? [uba({ app })] : []
    return [...template];
}