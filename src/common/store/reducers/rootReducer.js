import RequestStatusReducer from '../reducers/requestStatusReducer';
import OrderListReducer from '../reducers/orderListReducer';
import OrderBookReducer from '../reducers/bookOrderValuesReducer';
import ChartReducer from '../reducers/chartReducer';
import FetchDataReducer from '../reducers/commonFetchDataReducer';
import GameManagementReducer from '../reducers/admin/gameManagementReducer';
import TraderGameManagementReducer from '../reducers/joinGameReducer';
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {history} from '../../utilities/history';

export const rootReducers = combineReducers({
    orderListReducer: OrderListReducer,
    chartReducer: ChartReducer,
    orderBookReducer: OrderBookReducer,
    fetchDataReducer: FetchDataReducer,
    gameManagementReducer: GameManagementReducer,
    requestStatusReducer: RequestStatusReducer,
    traderGameManagementReducer: TraderGameManagementReducer,
    router: connectRouter(history)
});