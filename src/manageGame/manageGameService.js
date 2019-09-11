import axios from 'axios';
import { env } from '../common/environment';

export const createNewGame = (formvalues) => {
  /*const formData=new FormData()
  formData.append('file', payload['file']);
  formData.append('gameCode', payload['gameName']);
  formData.append('gameMode', payload['gameMode']);
  formData.append('buySell', payload['transaction']);
  formData.append('gameInterval', payload['gameInterval']);
  formData.append('startingBalance', payload['startingCash']);
  formData.append('startingVolume', payload['volume']);*/
  const payload = {
    'gameCode': formvalues['gameName'],
    'gameMode': formvalues['gameMode'],
    'buySell': formvalues['transaction'],
    'gameInterval': formvalues['gameInterval'],
    'startingBalance': formvalues['startingCash'],
    'startingVolume': formvalues['volume']
}

  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/creategame`, payload);
}


export const uploadHistoricalDataFile = (payload) => {
  console.log('vv',payload);
  const formData=new FormData()
  formData.append('file', payload['file']);
  return axios.post(`${env.apiUrl}/trading/ordergenerator-service/ordergen/uploadFile`, formData);
}

export const getGameList = () => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/allgames`,{});
}

export const callJoinGame = (payload) => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/allgames`,payload);
}

export const callStartGame = (payload) => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/startgame`,payload);
}