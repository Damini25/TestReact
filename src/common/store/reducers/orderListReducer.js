import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    ordersToShow: {
        askOrders: [],
        bidOrders: []
    },
    totalOrdersToBeShown: 6
}

const OrderListReducer = (state = initialState, action) => {
    // console.log('OrderListReducer', state, action);
    switch (action.type) {
        case ActionTypes.Update_Order_Front:
            const newOrderToShow = { ...state.ordersToShow };

            if (action.orderType === ActionTypes.Order_Type_ask) {
                const newAskOrder = [...state.ordersToShow['askOrders']]
                newAskOrder.pop();
                newAskOrder.unshift(action.element);
                newOrderToShow.askOrders = [...newAskOrder];
            } else {
                const newBidOrder = [...state.ordersToShow['bidOrders']]
                newBidOrder.pop();
                newBidOrder.unshift(action.element);
                newOrderToShow.bidOrders = [...newBidOrder];
                console.log('OrderListReducer', state.ordersToShow.bidOrders===newOrderToShow.bidOrders);
            }
            return {
                ...state, ordersToShow: newOrderToShow
            }

        case ActionTypes.New_Replace_Orders:
            const newOrderToShow2 = { ...state.ordersToShow }

            if (action.orderType === ActionTypes.Order_Type_ask) {
                const newAskOrder = [...state.ordersToShow['askOrders']]
                newAskOrder.push(action.element);
                newOrderToShow2.askOrders = [...newAskOrder];
            } else {
                const newBidOrder = [...state.ordersToShow['bidOrders']]
                newBidOrder.push(action.element);
                newOrderToShow2.bidOrders = [...newBidOrder];
            }
            return {
                ...state, ordersToShow: newOrderToShow2
            }

        default:
            return state;
    }
}

export default OrderListReducer;