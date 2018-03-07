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