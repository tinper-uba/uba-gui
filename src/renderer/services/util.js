export const getNowDate = () => {
    let dt = new Date();
    return (dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDay() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds());
}

