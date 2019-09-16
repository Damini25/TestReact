import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { login } from '../../../login/loginService';
import { setLocalStorage } from '../../../common/localStorageService';
import { push } from 'connected-react-router';



export function* loginUser(action) {
  try {
    const response = yield call(login, action.payload);
    if (response['data'].success) {
      console.log('loginresponse', response, response['data'].success)
      setLocalStorage({
        name: 'traderId',
        value: response.data['data'][0]['userId']
      });
      setLocalStorage({
        name: 'userTypeId',
        value: response.data['data'][0]['userTypeId']
      });
      yield put({ type: ActionTypes.Set_User_Details, element: { 'traderId': response.data['data'][0]['userId'] } });
      //  yield put({ type: ActionTypes.Show_SnackBar, msg: 'Login successfull' })
  
      if (parseInt(response.data['data'][0]['userTypeId']) === 0) {
        yield put(push('/mainNav/manageGame'))
      } else {
        yield put(push('/mainNav/joinGame'))
      }
    }
  } catch (e) {

  }
}

export function* callLoginApi() {
  yield takeLatest(ActionTypes.Call_Login_Api, loginUser);
}

export default function* loginSaga() {
  yield all([callLoginApi()]);
}