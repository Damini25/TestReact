import * as Actiontypes from './actionTypes';

export const AddTototalOrders = (type,item) => {
    return {
        type: Actiontypes.Total_Orders_TillNow,
        element: item,
        orderType:type
    }
}

export const ClearTotalOrders = () => {
    return {
        type: Actiontypes.Clear_Prev_TotalOrders,
    }
}