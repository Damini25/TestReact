import axios from 'axios';
import { env } from '../common/environment';

export const createNewGame = (payload) => {
  /*const formData=new FormData()
  formData.append('file', payload['file']);
  formData.append('gameCode', payload['gameName']);
  formData.append('gameMode', payload['gameMode']);
  formData.append('buySell', payload['transaction']);
  formData.append('gameInterval', payload['gameInterval']);
  formData.append('startingBalance', payload['startingCash']);
  formData.append('startingVolume', payload['volume']);*/

  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/creategame`, payload);
}


export const uploadHistoricalDataFile = (payload) => {
  const formData=new FormData()
  formData.append('file', payload['file']);
  return axios.post(`${env.apiUrl}/trading/ordergenerator-service/ordergen/uploadFile`, formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
});
}

export const getGameList = () => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/allgames`,{});
}