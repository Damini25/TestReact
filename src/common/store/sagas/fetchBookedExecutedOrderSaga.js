import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { clearLocalStorageKey } from '../../localStorageService'
import { getBookedOrderList, getExecutedOrderList} from '../../../orderEntry/services/orderEntry.service';
import { push } from 'connected-react-router';

export function* fetchBookedOrders(action) {
  const {response,error} = yield call(getBookedOrderList,action.payload);
  if(response && response.data['data']){
    yield put({ type: ActionTypes.Fetch_Booked_Orders, data: response.data['data'] });
  }else if(response.data['error']['key'] === 'gameSessionEnded'){
    yield put({ type: ActionTypes.Show_SnackBar, msg: 'Game Session ended. Try next time' })
    clearLocalStorageKey('gameSessionId');
    clearLocalStorageKey('gameId');
    yield put(push('/mainNav/joinGame'));
  }
}
export function* loadBookedOrders() {
  yield takeLatest(ActionTypes.Load_Booked_Orders, fetchBookedOrders);
}

export function* fetchExecutedOrders(action) {
  const {response,error} = yield call(getExecutedOrderList,action.payload);
  if(response && response.data['data']){
    yield put({ type: ActionTypes.Fetch_Executed_Orders, data: response.data['data'] });
  }else if(response.data['error']['key'] === 'gameSessionEnded'){
    clearLocalStorageKey('gameSessionId');
    clearLocalStorageKey('gameId');
   // clearLocalStorageKey('orderFetchInterval');
    yield put(push('/mainNav/joinGame'));
  }
}
export function* loadExecutedOrders() {
  yield takeLatest(ActionTypes.Load_Executed_Orders, fetchExecutedOrders);
}

export default function* bookedExecutedOrderList() {
  yield all([loadBookedOrders(),loadExecutedOrders()]);
}