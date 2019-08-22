import * as Actiontypes from './actionTypes';

export const UpdateOrderFormValues = (item) => {
    return {
        type: Actiontypes.Update_BookOrderForm_Values,
        element: item
    }
}

export const ResetOrderFormValues = () => {
    return {
        type: Actiontypes.Clear_BookOrderForm_Values
    }
}

export const LoadStockSymbol=()=>{
    return {
        type:Actiontypes.Load_Stock_Symbols
    }
}