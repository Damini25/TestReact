import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider, ReactReduxContext } from 'react-redux';
import './common/utilities/httpInterceptor';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './common/store/sagas/sagaIndex';
import {rootReducers} from './common/store/reducers/rootReducer';
import {history} from './common/utilities/history';

const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middleWares = [routeMiddleware, sagaMiddleware]
const store = createStore(rootReducers, applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext} >
        <ConnectedRouter history={history} >
            <App></App>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();