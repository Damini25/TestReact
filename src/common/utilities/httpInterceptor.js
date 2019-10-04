import axios from 'axios';
import { getLocalStorage } from './localStorageService';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use((req) => {
    if (getLocalStorage('gameSessionId')) {
        req['headers']['gameSessionId'] = getLocalStorage('gameSessionId')
    }
    if (getLocalStorage('traderId')) {
        req['headers']['userId'] = getLocalStorage('traderId')
    }
    if (getLocalStorage('gameId')) {
        req['headers']['gameId'] = getLocalStorage('gameId')
    }
    return req;
});

// axios.interceptors.response.use((res) => {
//     if (res.status === 500) {
//       //  return Promise.reject(error);
//     }
//     return res;
// });
