import download from 'download-git-repo';

const Init = (argv) => {
    let { project, selectName, upload } = argv;
    console.log('start download');
    return new Promise((resolve, reject) => {
        download(`uba-templates/${selectName}`, `${upload}/${project}`, function (err) {
            if (err) {
                reject({ success: false, msg: err });
            } else {
                resolve({ success: true, msg: 'ok' });
            }
        });
    });
}

export default Init;