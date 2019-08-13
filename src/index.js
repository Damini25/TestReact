import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import OrderListReducer from './common/store/reducers/orderListReducer';
import OrderBookReducer from './common/store/reducers/bookOrderValuesReducer';

const rootReducers = combineReducers({
    orderListReducer: OrderListReducer,
    orderBookReducer: OrderBookReducer
})
const store = createStore(rootReducers);

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