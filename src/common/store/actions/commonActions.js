import * as Actiontypes from './actionTypes';

export const SetUserDetails=(data)=>{
    return {
        type:Actiontypes.Set_User_Details,
        element:data
    }
}