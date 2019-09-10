import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ShowLoaderReducer from './common/store/reducers/loaderReducer';
import OrderListReducer from './common/store/reducers/orderListReducer';
import OrderBookReducer from './common/store/reducers/bookOrderValuesReducer';
import ChartReducer from './common/store/reducers/chartReducer';
import FetchDataReducer from './common/store/reducers/commonFetchDataReducer';
import GameManagementReducer from './common/store/reducers/admin/gameManagementReducer';
import './common/httpInterceptor';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './common/store/sagas/sagaIndex';


const rootReducers = combineReducers({
    orderListReducer: OrderListReducer,
    chartReducer: ChartReducer,
    orderBookReducer: OrderBookReducer,
    fetchDataReducer: FetchDataReducer,
    gameManagementReducer:GameManagementReducer,
    showLoaderReducer:ShowLoaderReducer
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