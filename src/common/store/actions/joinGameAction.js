import * as Actiontypes from './actionTypes';

export const LoadTraderGameList = () => {
    return {
        type: Actiontypes.Load_Trader_Games
    }
}

export const JoinGame = (payload) => {
    return {
        type: Actiontypes.Join_Game,
        payload:payload
    }
}