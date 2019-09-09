import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { getInitialOrderList } from '../../../orderEntry/services/orderEntry.service';


export function* fetchBidAskOrders(action) {
    const { payload } = action;
    try {
        // console.log('fetchBidAskOrders', typeof ((getInitialOrderList())))
        // const data = yield getInitialOrderList(action.payload);
        /* const res = yield call(axios.post, 'https://reqres.in/api/users', {
            "name": "morpheus",
            "job": "leader"
        }) */

        //const res = yield call(data, 'json');
        
       // const response = yield call(getInitialOrderList, payload);
       const response = yield call(getInitialOrderList, payload);

        yield put({ type: ActionTypes.OnRecieve_BidAsk_Data, data: response.data['data'] });
        console.log(response);



        //   const response = yield fetch()
        /* console.log('response', response);
        if (response) {
            yield put({ type: ActionTypes.OnRecieve_BidAsk_Data, data: response.data['data'] });
        } */
    } catch (error) {
        console.error(error)
    }
}

export function* loadBidAskData() {
    yield takeLatest(ActionTypes.Load_BidAsk_List, fetchBidAskOrders);
}

export default function* bookTraderSaga() {
    yield all([loadBidAskData()]);
}