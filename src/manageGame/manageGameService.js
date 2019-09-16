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
    'startingVolume': formvalues['volume'],
    'playbackStartTime': formvalues['playbackStartTime'],
    'playbackEndTime': formvalues['playbackEndTime'],
    'playbackFrequency': formvalues['playbackFrequency']
  }
  if (formvalues['gameId']) {
    payload['gameId'] = formvalues['gameId']
  }
  if (formvalues['playbackFlag']!== undefined || formvalues['playbackFlag']!== null) {
    payload['playbackFlag'] = formvalues['playbackFlag']
  }
  if (formvalues['isGameActive']!== undefined || formvalues['isGameActive']!== null) {
    payload['isGameActive'] = formvalues['isGameActive']
  }
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/creategame`, payload);
}


export const uploadHistoricalDataFile = (payload, gameId) => {
  console.log('uploadHistoricalDataFile', payload, gameId);
  const formData = new FormData()
  formData.append('file', payload['file']);
  formData.append('gameId', gameId);
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/uploadFile`, formData);
}

export const getGameList = (payload) => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/allgames`, {});
}

export const callJoinGame = (payload) => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/joingame?gameId=${payload['gameId']}`, {});
}

export const callStartGame = (payload) => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/startgame`, payload);
}
export const callStopGame = (payload) => {
  return axios.post(`${env.apiUrl}/trading/gamemgmt-service/game/stopgame?gameId=${payload['gameId']}`, {});
}
export const callDeleteGame = (payload) => {
  return axios.delete(`${env.apiUrl}/trading/gamemgmt-service/game/deletegame?gameId=${payload['gameId']}`);
}
