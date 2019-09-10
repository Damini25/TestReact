import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../../actions/actionTypes';
import { createNewGame } from '../../../../manageGame/manageGameService';

export function* callCreateGameAPI(action) {
    const { payload } = action;
    try {
        console.log('create new game api response', 1);
        yield put({ type: ActionTypes.Request_Posts});
        const response = yield call(createNewGame, payload);
        console.log('create new game api response', response);
        yield put({ type: ActionTypes.Game_Created_Success});
        yield put({ type: ActionTypes.Recieve_Posts});
    }
    catch (e) {
        yield put({ type: ActionTypes.RecieveError_Posts});
    }
}

export function* getGameFormValues() {
    yield takeLatest(ActionTypes.Post_CreateGameForm_Values, callCreateGameAPI);
}

export default function* bookedExecutedOrderList() {
    yield all([getGameFormValues()]);
}