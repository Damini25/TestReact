import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { getProducts } from '../../../orderEntry/services/orderEntry.service';

export function* fetchStockSymbol() {
    const response = yield call(getProducts);
    yield put({type: ActionTypes.Fetch_Stock_Symbols, data: response.data});
}

export function* loadStockSymbol() {
    yield takeEvery(ActionTypes.Load_Stock_Symbols, fetchStockSymbol);
  }
  
  export default function* rootSaga() {
    yield all([loadStockSymbol()]);
  }