import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { login, logout } from '../../../main/login/loginService';
import { setLocalStorage } from '../../utilities/localStorageService';
import { push } from 'connected-react-router';

export function* loginUser(action) {
  yield put({ type: ActionTypes.Request_Posts });
  const { response, error } = yield call(login, action.payload);
  yield put({ type: ActionTypes.Recieve_Posts });

  if (response && response.data.success && response.data['data'][0]) {
    setLocalStorage({
      name: 'traderId',
      value: response.data['data'][0]['userId']
    });
    setLocalStorage({
      name: 'userTypeId',
      value: response.data['data'][0]['userTypeId']
    });
    setLocalStorage({
      name: 'userName',
      value: response.data['data'][0]['userEmail']
    });
    yield put({ type: ActionTypes.Set_User_Details, element: { 'traderId': response.data['data'][0]['userId'] } });
    yield put({ type: ActionTypes.Show_SnackBar, msg: 'Login successful' });

    if (parseInt(response.data['data'][0]['userTypeId']) === 0) {
      yield put(push('/mainNav/manageGame'))
    }
    else {
      yield put(push('/mainNav/joinGame'))
    }
  }
  else if (response.data['error']['key'] === 'credentialsIncorrect') {
    yield put({ type: ActionTypes.Show_SnackBar, msg: 'Either username or password is incorrect.Please try again.' });
  }
  else {
    yield put({ type: ActionTypes.Show_SnackBar, msg: 'Some Error Occurred. Please try again' })
    yield put({ type: ActionTypes.RecieveError_Posts });
  }
}

export function* callLoginApi() {
  yield takeLatest(ActionTypes.Call_Login_Api, loginUser);
}

export function* logoutUser(action) {
  const response = yield call(logout, action.payload);
}

export function* callLogoutApi() {
  yield takeLatest(ActionTypes.Call_Logout, logoutUser);
}
export default function* loginSaga() {
  yield all([callLoginApi(), callLogoutApi()]);
}