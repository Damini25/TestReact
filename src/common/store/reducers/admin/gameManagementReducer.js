import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
    createGameFormValue: {
        gameName: '',
        gameMode: 'general',
        startingCash: '',
        volume: '',
        transaction: '',
        gameInterval: '',
        file: null
    }
}

const GameManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Update_CreateGameForm_Values:
            const updateCreateGameFormValue = { ...state.createGameFormValue, ...action.element };
            return {
                ...state,
                createGameFormValue: updateCreateGameFormValue
            }
        case ActionTypes.Game_Created_Success: {
            const clearData = { ...state['createGameFormValue'] }
            clearData['gameName'] = '';
            clearData['gameMode'] = 'general';
            clearData['startingCash'] = '';
            clearData['volume'] = '';
            clearData['transaction'] = '';
            clearData['gameInterval'] = '';
            clearData['file'] = null;
            return {
                ...state, createGameFormValue: clearData
            }
        }
        default:
            return state;
    }
}

export default GameManagementReducer;