import * as Actiontypes from '../actionTypes';

export const LoadGameData = () => {
    return {
        type: Actiontypes.Load_ALL_Games
    }
}


export const UpdateCreateGameFormValues = (item) => {
    return {
        type: Actiontypes.Update_CreateGameForm_Values,
        element: item
    }
}

export const PostCreateGameData = (payload) => {
    return {
        type: Actiontypes.Post_CreateGameForm_Values,
        payload: payload
    }
}

export const ResetGameFormValues = () => {
    return {
      //  type: Actiontypes.Clear_BookOrderForm_Values
    }
}
