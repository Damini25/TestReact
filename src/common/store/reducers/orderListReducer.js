import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    ordersToShow: []
}

const OrderListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Add_New_Order_Front:
            const newOrderList = [...state.ordersToShow];
            action.element.map((ele) => {
                newOrderList.unshift(ele)
            });
            return {
                ...state, ordersToShow: newOrderList
            }

        case ActionTypes.Replace_Orders:
            const newOrderList = [...action.element];
            return {
                ordersToShow: newOrderList
            }

        default:
            return state;
    }
}

export default OrderListReducer;