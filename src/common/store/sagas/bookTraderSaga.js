import { all, call, put, takeLatest, delay } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { clearLocalStorageKey } from '../../utilities/localStorageService';
import { getInitialOrderList, generateOrders, getGamePlayPauseStatus, bookNewOrder } from '../../../main/user/orderEntry.service';
import { push } from 'connected-react-router';

export function* fetchBidAskOrders(action) {
    const { payload } = action;
    const { response } = yield call(getInitialOrderList, payload);
    if (response && response['data'].success) {
        yield put({ type: ActionTypes.OnRecieve_BidAsk_Data, data: response.data['data'] });
    } else if (response['data'].error) {
        if (response['data'].error['key'] === 'gameSessionEnded') {
            clearLocalStorageKey('gameSessionId');
            clearLocalStorageKey('gameId');
            //clearLocalStorageKey('orderFetchInterval');
            yield put(push('/mainNav/joinGame'));
        }
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
    const response = yield call(getGamePlayPauseStatus, action['payload']['gameId']);
    if (response['data']['data']['playbackFlag']) {
        yield put({ type: ActionTypes.Set_Game_PlayPause_Status, playbackFlag: response['data']['data']['playbackFlag'] });
    }
}

export function* checkGamePlayPauseStatus() {
    yield takeLatest(ActionTypes.Check_Game_PlayPause, callCheckGameStatusApi);
}

export function* callBookNewOrderAPI(action) {
    const { payload } = action;
    const { response, error } = yield call(bookNewOrder, payload);
   if (response && response['data']['success']) {
        yield put({ type: ActionTypes.Book_Order_Success, value: true });
        yield put({ type: ActionTypes.Clear_BookOrderForm_Values });
        yield delay(2000);
        yield  put({ type: ActionTypes.Book_Order_Success, value: false });
    }
    else {
        yield put({ type: ActionTypes.Show_SnackBar, msg: 'Some Error Occurred. Please try again' })
    }
}


export function* postBookOrderFormValues() {
    yield takeLatest(ActionTypes.Post_BookOrder_FormValues, callBookNewOrderAPI);
}

export default function* bookTraderSaga() {
    yield all([loadBidAskData(), onGenerateOrders(), checkGamePlayPauseStatus(), postBookOrderFormValues()]);
}