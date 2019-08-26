import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    stockSymbols: [],
    userDetails: {
        name: 'test'
    },
    loginFormError: {
        emailInvalid: false,
        passwordInvalid: false
    }
}

const FetchDataReducer = (state = initialState, action) => {
  //  console.log('ftech reducer state action',state,action)
    switch (action.type) {
        case ActionTypes.Set_User_Details:
            const updatedOrderFormValue = { ...state.bookOrderFormValue, ...action.element };
            return {
                ...state,
                userDetails: updatedOrderFormValue
            }

        case ActionTypes.Fetch_Stock_Symbols:
            return {
                ...state,
                stockSymbols: action.data
            }
        case ActionTypes.Set_LoginForm_ValidityState:
            const loginFormValidity = { ...state.loginFormError }
            if (action.fieldName === 'email') {
                loginFormValidity.emailInvalid = action.value;
            } else if (action.fieldName === 'password') {
                loginFormValidity.passwordInvalid = action.value;
            }
            return {
                ...state,
                loginFormError: { ...state.loginFormError, ...loginFormValidity }
            }
        default:
            return state;
    }
}

export default FetchDataReducer;