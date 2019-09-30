import axios from 'axios';
import { env } from '../../common/utilities/environment';

export const login = (payload) => {
    return axios.post(`${env.apiUrl}` + '/trading/gamemgmt-service/user/userlogin', payload, null).then(response => ({ response }))
        .catch(error => ({ error }));
}

export const logout = (payload) => {
    // return axios.post(`${env.apiUrl}` + '/trading/gamemgmt-service/user/userlogin', payload, null).then(response => ({ response }))
    //     .catch(error => ({ error }));
}