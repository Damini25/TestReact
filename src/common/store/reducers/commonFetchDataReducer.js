import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    stockSymbols: [],
    userDetails: {
        name: ''
    }
}

const FetchDataReducer = (state = initialState, action) => {
  
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

        default:
            return state;
    }
}

export default FetchDataReducer;