import * as Actiontypes from './actionTypes';

export const SetUserDetails=(data)=>{
    return {
        type:Actiontypes.Set_User_Details,
        element:data
    }
}

export const SetLoginFormValidity=(data)=>{
    return {
        type:Actiontypes.Set_LoginForm_ValidityState,
        fieldName:data['fieldName'],
        value:data['formError']
    }
}