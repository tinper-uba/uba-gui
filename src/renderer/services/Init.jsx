import axios from 'axios';

const repos = 'https://api.github.com/users/uba-templates/repos';

export function get(){
    return axios.get(repos);
}