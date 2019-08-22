import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    stockSymbols: []
}

const FetchDataReducer = (state = initialState, action) => {
    switch (action.type) {
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