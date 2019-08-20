import axios from 'axios';
import {env} from '../../common/environment';

// export const getInitialOrderList = (payload) => {
//     return axios.post(`${env.apiUrl}`+'/userdashb/bidaskscreen/fetch',payload);
// }

export const getInitialOrderList = (payload) => {
  return axios.get(process.env.PUBLIC_URL+'/mockData/orderList.json');
}

export const getLatestOrderList = (payload) => {
  return axios.get(process.env.PUBLIC_URL+'/mockData/orderList.json');
//  return axios.get(`${env.apiUrl}`+'/assets/mockJson/loginSuccess.json');
}

export const bookNewOrder = (payload) => {
    return axios.post(`${env.apiUrl}`+'/assets/mockJson/loginSuccess.json',payload,null);
}  
