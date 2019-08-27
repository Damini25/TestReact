import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import OrderListReducer from './common/store/reducers/orderListReducer';
import OrderBookReducer from './common/store/reducers/bookOrderValuesReducer';
import ChartReducer from './common/store/reducers/chartReducer';
import FetchDataReducer from './common/store/reducers/commonFetchDataReducer';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './common/store/sagas/sagaIndex';

/*axios.defaults.baseURL = 'http://localhost:8303';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.interceptors.request.use((req) => {
    req.url=req.url+`?requestedTime=${Date.now()}`
    return req;
});*/

const rootReducers = combineReducers({
    orderListReducer: OrderListReducer,
    chartReducer: ChartReducer,
    orderBookReducer: OrderBookReducer,
    fetchDataReducer: FetchDataReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
//const store = createStore(rootReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root'));






/*ReactDOM.render(
    <App></App>,
    document.getElementById('root'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();