import axios from 'axios';
import {env} from '../../common/environment';

export const getOrderList = () => {
    return axios.get(process.env.PUBLIC_URL+'/mockData/orderList.json');
  //  return axios.get(`${env.apiUrl}`+'/assets/mockJson/loginSuccess.json');
}

export const bookNewOrder = (payload) => {
    return axios.post(`${env.apiUrl}`+'/assets/mockJson/loginSuccess.json',payload,null);
}  
