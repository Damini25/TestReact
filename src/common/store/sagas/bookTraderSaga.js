import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { getInitialOrderList, generateOrders, getGamePlayPauseStatus } from '../../../orderEntry/services/orderEntry.service';


export function* fetchBidAskOrders(action) {
    const { payload } = action;
    try {
        const response = yield call(getInitialOrderList, payload);
        yield put({ type: ActionTypes.OnRecieve_BidAsk_Data, data: response.data['data'] });
    } catch (error) {
        console.error('sagaFetchCallBidAskerror', error)
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

export function* callCheckGameStatusApi(action) {
    const response = yield call(getGamePlayPauseStatus,action['payload']['gameId']);
    if (response['data']['data']['playbackFlag']) {
        yield put({ type: ActionTypes.Set_Game_PlayPause_Status, playbackFlag:response['data']['data']['playbackFlag'] });
    }
}

export function* checkGamePlayPauseStatus() {
    yield takeLatest(ActionTypes.Check_Game_PlayPause, callCheckGameStatusApi);
}

export default function* bookTraderSaga() {
    yield all([loadBidAskData(), onGenerateOrders(), checkGamePlayPauseStatus()]);
}