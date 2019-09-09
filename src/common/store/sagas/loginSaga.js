import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { login } from '../../../login/loginService';
import { setLocalStorage } from '../../../common/localStorageService';

export function* loginUser(action) {
    const response = yield call(login, action.payload);
    if (response['data'].success) {
      console.log('loginresponse',response,response['data'].success)
      setLocalStorage({
        name: 'sessionId',
        value: 'xyz'
      });
      setLocalStorage({
        name: 'traderId',
        value: response.data['data'][0]['userId']
      });

      yield put({ type: ActionTypes.Set_User_Details, element: {'traderId':response.data['data'][0]['userId'] } });
    }
  }

  export function* callLoginApi() {
    yield takeLatest(ActionTypes.Call_Login_Api, loginUser);
  }

export default function* loginSaga() {
  yield all([callLoginApi()]);
}