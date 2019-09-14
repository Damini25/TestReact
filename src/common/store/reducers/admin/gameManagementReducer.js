import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
    gameCreatedSucess: false,
    createGameFormValue: {
        gameName: '',
        gameMode: 'general',
        startingCash: '',
        volume: '',
        transaction: '',
        gameInterval:60,
        playbackFrequency: '',
        playbackStartTime: '',
        playbackEndTime: '',
        file: ''
    },
  //  fetchOrderInterval: '',
    listGames: [],
    gameStarted: {
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
            clearData['playbackStartTime'] = '';
            clearData['playbackEndTime'] = '';
            clearData['playbackFrequency'] = '';
            clearData['file'] = '';

            return {
                ...state, createGameFormValue: clearData, gameCreatedSucess: true
            }
        }
        case ActionTypes.Fetch_All_Games:
            // console.log('Fetch_All_Games', [...action.data])
            return {
                ...state,
                listGames: [...action.data]
            }
        case ActionTypes.Game_Started_ByAdmin:
            //  console.log('Game_Started_ByAdmin', { ...action.data })
            return {
                ...state,
                gameStarted: { ...action.data }
            }
        default:
            return state;
    }
}

export default GameManagementReducer;