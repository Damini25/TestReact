import axios from 'axios';
import {env} from '../../common/environment';

export const getInitialOrderList = (payload) => {
    return axios.post(`${env.apiUrl}`+'/userdashb/bidaskscreen/fetch',payload);
}

export const getChartDataInitialOrderList = (payload) => {
  return axios.get(`${env.apiUrl}`+'/userdashb/graphscr/allorders?productId='+ payload['productId']);
}
// export const getInitialOrderList = (payload) => {
//   return axios.get(process.env.PUBLIC_URL+'/mockData/orderList.json');
// }

export const getLatestOrderList = (payload) => {
  return axios.get(process.env.PUBLIC_URL+'/mockData/orderList.json');
//  return axios.get(`${env.apiUrl}`+'/assets/mockJson/loginSuccess.json');
}

export const bookNewOrder = (payload) => {
    return axios.post(`${env.apiUrl}`+'/userdashb/orderscreen/book',payload,null);
}  

export const getProducts = () => {
  return axios.get(process.env.PUBLIC_URL+'/mockData/productsData.json');
 // return axios.get(`${env.apiUrl}`+'/userdashb/orderscreen/book',payload,null);
}  

export const getBookedOrderList = (payload) => {
  return axios.get(process.env.PUBLIC_URL+'/mockData/orderList.json');
 // return axios.get(`${env.apiUrl}`+'/userdashb/orderscreen/book',payload,null);
}  

export const getExecutedOrderList = (payload) => {
  return axios.get(process.env.PUBLIC_URL+'/mockData/orderList.json');
 // return axios.post(`${env.apiUrl}`+'/userdashb/orderscreen/book',payload,null);
}  