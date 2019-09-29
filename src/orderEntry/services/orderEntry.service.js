import axios from 'axios';
import { env } from '../../common/environment';

export const getInitialOrderList = (payload) => {
  return axios.post(`${env.apiUrl}` + '/trading/ordermgmt-service/userdashb/bidaskscreen/fetch', payload).then(response => ({ response }))
    .catch(error => ({ error }));
}


export const bookNewOrder = (payload) => {
  return axios.post(`${env.apiUrl}` + '/trading/ordermgmt-service/ordermgmt/neworder', payload, null);
}

export const getProducts = () => { 
  return axios.post(`${env.apiUrl}` + '/trading/ordermgmt-service/ordergen/allgameproducts',{});
}

export const getBookedOrderList = (payload) => {
  return axios.post(`${env.apiUrl}` + '/trading/ordermgmt-service/ordermgmt/orderbook', payload, null).then(response => ({ response }))
  .catch(error => ({ error }));;;
}

export const getExecutedOrderList = (payload) => {
  return axios.get(process.env.PUBLIC_URL + '/mockData/orderList.json').then(response => ({ response }))
  .catch(error => ({ error }));;;
}

export const getNewsList = (payload) => {
  return axios.get(process.env.PUBLIC_URL + '/mockData/news.json').then(response => ({ response }))
    .catch(error => ({ error }));
}

export const generateOrders = () => {
  return axios.get(`${env.apiUrl}` + '/trading/ordergenerator-service/ordergen/generateorders');
}

export const getPortfolioList = () => {
  return axios.post(`${env.apiUrl}` + '/trading/ordermgmt-service/userdashb/portfolio', {}).then(response => ({ response }))
    .catch(error => ({ error }));
}

export const getGamePlayPauseStatus = (gameId) => {
  return axios.get(`${env.apiUrl}/trading/gamemgmt-service/game/checkPlaybackFlag?gameId=${gameId}`);
} 