import * as Actiontypes from './actionTypes';

export const UpdateRecentOrders = (type,item) => {
    return {
        type: Actiontypes.Update_Order_Front,
        element: item,
        orderType:type
    }
}

export const AddNewOrders = (type,item) => {
    return {
        type: Actiontypes.Add_New_Orders,
        element: item,
        orderType:type
    }
}