import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, ReactReduxContext } from 'react-redux';
import RequestStatusReducer from './common/store/reducers/requestStatusReducer';
import OrderListReducer from './common/store/reducers/orderListReducer';
import OrderBookReducer from './common/store/reducers/bookOrderValuesReducer';
import ChartReducer from './common/store/reducers/chartReducer';
import FetchDataReducer from './common/store/reducers/commonFetchDataReducer';
import GameManagementReducer from './common/store/reducers/admin/gameManagementReducer';
import TraderGameManagementReducer from './common/store/reducers/joinGameReducer';
import './common/httpInterceptor';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './common/store/sagas/sagaIndex';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory({ basename: '/trading' });
const rootReducers = combineReducers({
    orderListReducer: OrderListReducer,
    chartReducer: ChartReducer,
    orderBookReducer: OrderBookReducer,
    fetchDataReducer: FetchDataReducer,
    gameManagementReducer: GameManagementReducer,
    requestStatusReducer: RequestStatusReducer,
    traderGameManagementReducer: TraderGameManagementReducer,
    router: connectRouter(history)
});

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