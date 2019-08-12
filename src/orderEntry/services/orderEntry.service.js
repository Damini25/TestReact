import axios from 'axios';
import {env} from '../../common/environment';

export const bookNewOrder = (payload) => {
    return axios.post(`${env.apiUrl}`+'/assets/mockJson/loginSuccess.json',payload,null);
}  