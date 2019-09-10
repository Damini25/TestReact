import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listTraderGames: []
}

const TraderGameManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Fetch_All_TraderGames:
            console.log('Fetch_All_TraderGames', [...action.data])
            return {
                ...state,
                listTraderGames: [...action.data]
            }
        default:
            return state;
    }
}

export default TraderGameManagementReducer;