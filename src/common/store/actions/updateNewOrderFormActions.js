import * as Actiontypes from './actionTypes';

export const UpdateOrderFormValues = (item) => {
    return {
        type: Actiontypes.Update_BookOrderForm_Values,
        element: item
    }
}