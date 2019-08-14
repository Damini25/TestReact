import * as Actiontypes from './actionTypes';

export const AddToOrderList = (type,item) => {
    return {
        type: Actiontypes.Update_Order_Front,
        element: item,
        orderType:type
    }
}

export const AddNewOrReplaceOrderList = (type,item) => {
    return {
        type: Actiontypes.New_Replace_Orders,
        element: item,
        orderType:type
    }
}