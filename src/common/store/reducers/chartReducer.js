import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    totalOrderTillNow: {
        askOrders: [],
        bidOrders: []
    }
}

const ChartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Total_Orders_TillNow:
            const newOrderToShow2 = { ...state.totalOrderTillNow }

            if (action.orderType === ActionTypes.Order_Type_ask) {
                const newAskOrder = [...state.totalOrderTillNow['askOrders']]
                newAskOrder.push(action.element);
                newOrderToShow2.askOrders = [...newAskOrder];
                console.log('OrderListReducer', state.totalOrderTillNow.askOrders === newOrderToShow2.askOrders);
            } else {
                const newBidOrder = [...state.totalOrderTillNow['bidOrders']]
                newBidOrder.push(action.element);
                newOrderToShow2.bidOrders = [...newBidOrder];
            }
            return {
                ...state, totalOrderTillNow: newOrderToShow2
            }
        case ActionTypes.Clear_Prev_TotalOrders:
            const newOrderToShow = { ...state.totalOrderTillNow }
            newOrderToShow.askOrders = [];
            newOrderToShow.bidOrders = [];
            return {
                ...state, totalOrderTillNow: newOrderToShow
            }

        case ActionTypes.Add_To_Ask_TOrders: {
            const newOrders = { ...state.totalOrderTillNow }
            // const newaskOrders = newOrders['askOrders'].concat(action.element);
            newOrders.askOrders = [...newOrders.askOrders, ...action.element];
            return {
                ...state, totalOrderTillNow: newOrders
            }
        }

        case ActionTypes.Add_To_Bid_TOrders: {
            const newOrders = { ...state.totalOrderTillNow }
            newOrders.bidOrders = [...newOrders.bidOrders, ...action.element];
            return {
                ...state, totalOrderTillNow: newOrders
            }
        }

        default:
            return state;
    }
}

export default ChartReducer;