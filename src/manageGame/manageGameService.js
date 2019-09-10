import axios from 'axios';
import { env } from '../common/environment';

export const createNewGame = (payload) => {
  return axios.post(`${env.apiUrl}/trading/ordermgmt-service/ordermgmt/neworder`, payload);
}
  