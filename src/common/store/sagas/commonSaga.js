import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { getProducts, getNewsList, getPortfolioList } from '../../../main/user/orderEntry.service';
import { clearLocalStorageKey } from '../../utilities/localStorageService'
import { push } from 'connected-react-router';


export function* fetchStockSymbol() {
  const response = yield call(getProducts);
  yield put({ type: ActionTypes.Fetch_Stock_Symbols, data: response.data });
}
export function* loadStockSymbol() {
  yield takeEvery(ActionTypes.Load_Stock_Symbols, fetchStockSymbol);
}

export function* fetchNewsList() {
  const { response } = yield call(getNewsList);
  if (response.data['success']) {
    yield put({ type: ActionTypes.Fetch_News_List, data: response.data['data'] });
  }
}
export function* loadNewsList() {
  yield takeLatest(ActionTypes.Load_News_List, fetchNewsList);
}

export function* fetchPortfolioList(action) {
  // const { payload } = action;
  const { response } = yield call(getPortfolioList);
  if (response && response.data['success']) {
    yield put({ type: ActionTypes.Recieve_Portfolio_List, data: response.data['data'] });
  } else if (response.data['error']['key'] === 'gameSessionEnded') {
    clearLocalStorageKey('gameSessionId');
    clearLocalStorageKey('gameId');
   // clearLocalStorageKey('orderFetchInterval');
    yield put(push('/mainNav/joinGame'));
  } else {
    yield put({ type: ActionTypes.Show_SnackBar, msg: 'Some Error Occurred. Please try again' })
  }
}

export function* loadPortfolioList() {
  yield takeLatest(ActionTypes.Load_Portfolio_List, fetchPortfolioList);
}


export default function* commonFetchSaga() {
  yield all([loadStockSymbol(), loadNewsList(), loadPortfolioList()]);
}