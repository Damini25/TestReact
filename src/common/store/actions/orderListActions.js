import * as Actiontypes from './actionTypes';

export const AddToOrderList = (item) => {
    return {
        type: Actiontypes.Add_New_Order_Front,
        element: item
    }
}

export const ReplaceOrderList = (item) => {
    return {
        type: Actiontypes.Replace_Orders,
        element: item
    }
}