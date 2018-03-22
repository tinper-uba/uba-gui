/**
 * @description 菜单项
 * @author Kvkens(yueming@yonyou.com)
 * @update 2018-03-22 14:43:52
 * @see https://electronjs.org/docs/api/menu-item
 */

export default function ubaMenu({ app }) {
    return {
        label: 'Uba-GUI',
        submenu: [{
            label: 'About uba GUI',
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: app.quit
        }]
    }
}