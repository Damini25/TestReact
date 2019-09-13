import * as ActionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    isFetching: false,
    snackBarInfo: {
        open: false,
        msg: '',
        duration: 4000
    }
}

const RequestStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Request_Posts: {
            return {
                ...state, isFetching: true
            }
        }
        case ActionTypes.Recieve_Posts: {
            return {
                ...state, isFetching: false
            }
        }
        case ActionTypes.RecieveError_Posts: {
            return {
                ...state, isFetching: false
            }
        }
        case ActionTypes.Show_SnackBar: {
            const info = { ...state.snackBarInfo }
            info['open'] = true;
            info['msg'] = action.msg;
            return {
                ...state, snackBarInfo: { ...info }
            }
        }
        case ActionTypes.Close_SnackBar: {
            const info = { ...state.snackBarInfo }
            info['open'] = false;
            return {
                ...state, snackBarInfo: { ...info }
            }
        }
        default:
            return state;
    }
}

export default RequestStatusReducer;