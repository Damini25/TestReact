import axios from 'axios';
import {getLocalStorage } from '../common/localStorageService';

//axios.defaults.baseURL = 'http://localhost:8303';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use((req) => {
  //  console.log('request intercepted',req);
    if(getLocalStorage('sessionId')){
        req.headers={
            sessionKey:getLocalStorage('sessionId')
        }
    }
  //  req.url = req.url + `?requestedTime=${Date.now()}`
    return req;
});