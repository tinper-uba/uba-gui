export const getNowDate = () => {
    let dt = new Date();
    return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}

