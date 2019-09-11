import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { createNewGame, getGameList, uploadHistoricalDataFile, callJoinGame,callStartGame } from '../../../manageGame/manageGameService';
import { setLocalStorage } from '../../../common/localStorageService';

export function* callCreateGameAPI(action) {
    const { payload } = action;
    try {
        console.log('create new game api response', 1);
        yield put({ type: ActionTypes.Request_Posts });
        yield call(uploadHistoricalDataFile, payload);
        const response = yield call(createNewGame, payload);
        console.log('create new game api response', response);
        yield put({ type: ActionTypes.Game_Created_Success });
        yield put({ type: ActionTypes.Recieve_Posts });
    }
    catch (e) {
        yield put({ type: ActionTypes.RecieveError_Posts });
    }
}

export function* postGameFormValues() {
    yield takeLatest(ActionTypes.Post_CreateGameForm_Values, callCreateGameAPI);
}

export function* fetchGameList() {
    const response = yield call(getGameList);
    yield put({ type: ActionTypes.Fetch_All_Games, data: response.data['data'] });
}
export function* loadGameList() {
    yield takeLatest(ActionTypes.Load_ALL_Games, fetchGameList);
}


export function* fetchTraderGameList() {
    const response = yield call(getGameList);
    yield put({ type: ActionTypes.Fetch_All_TraderGames, data: response.data['data'] });
}
export function* loadTraderGameList() {
    yield takeLatest(ActionTypes.Load_Trader_Games, fetchTraderGameList);
}

export function* callJoinGameAPI(action) {
    const {payload}=action;
    const response = yield call(callJoinGame,payload);
    setLocalStorage({
        name: 'gameSessionId',
        value: response.data['data'][0]['userId']
      });

   // yield put({ type: ActionTypes.On_Join_Game_Success, data: response.data['data'] });
}
export function* joinGame() {
    yield takeLatest(ActionTypes.Join_Game, callJoinGameAPI);
}


export function* callStartGameAPI(action) {
    const {payload}=action;
    const response = yield call(callStartGame,payload);
    yield call(getGameList);
    yield put({ type: ActionTypes.Game_Started_Success, data: response.data['data'] });
}

export function* startGameAdmin() {
    yield takeLatest(ActionTypes.Game_Started_ByAdmin, callStartGameAPI);
}

export default function* GameManagementSaga() {
    yield all([postGameFormValues(), loadGameList(),loadTraderGameList(),joinGame(),startGameAdmin()]);
}