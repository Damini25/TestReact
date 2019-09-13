import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { getInitialOrderList, generateOrders } from '../../../orderEntry/services/orderEntry.service';


export function* fetchBidAskOrders(action) {
    const { payload } = action;
    try {
        const response = yield call(getInitialOrderList, payload);
        yield put({ type: ActionTypes.OnRecieve_BidAsk_Data, data: response.data['data'] });
    } catch (error) {
        console.error(error)
    }
}

export function* loadBidAskData() {
    yield takeLatest(ActionTypes.Load_BidAsk_List, fetchBidAskOrders);
}

export function* callGenerateOrders() {
    yield call(generateOrders);
}

export function* onGenerateOrders() {
    yield takeLatest(ActionTypes.Generate_Orders, callGenerateOrders);
}

export default function* bookTraderSaga() {
    yield all([loadBidAskData(), onGenerateOrders()]);
}