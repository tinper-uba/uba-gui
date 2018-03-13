/**
 * 设置APP菜单
 */


import uba from './uba';

export default function configureMenu({ app }) {
    let template = process.platform === 'darwin' ? [uba({ app })] : []
    return [...template];
}