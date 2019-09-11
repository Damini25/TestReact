import * as ActionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    ordersToShow: {
        askOrders: [],
        bidOrders: [],
        minAskOrders: [],
        maxBidOrders: []
    },
    totalOrdersToBeShown: 20
}

const OrderListReducer = (state = initialState, action) => {
    //  console.log('OrderListReducer', state, action);
    switch (action.type) {

        case ActionTypes.OnRecieve_BidAsk_Data: {

           // console.log('bid/as', action)
            const newOrderToShow = { ...state.ordersToShow };

            newOrderToShow.askOrders = [...action['data'][0]['allAskOrders']];
            newOrderToShow.bidOrders = [...action['data'][0]['allBidOrders']];
            const time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
           
            if (action['data'][0]['allAskOrders'].length) {
                const minAskPrice = _.minBy(action['data'][0]['allAskOrders'], (o) => {
                    return o.price;
                });
                newOrderToShow.minAskOrders = [...state.ordersToShow.minAskOrders,
                { minAsk: minAskPrice, time: time }];
            }
            if (action['data'][0]['allBidOrders'].length) {
                const maxBidPrice = _.maxBy(action['data'][0]['allBidOrders'], (o) => {
                    return o.price;
                });
                newOrderToShow.maxBidOrders = [...state.ordersToShow.maxBidOrders,
                { maxBid: maxBidPrice, time: time }];
            }
           // console.log('minAskPrice', action['data'][0]['allAskOrders'])
            return {
                ...state, ordersToShow: newOrderToShow
            }
        }
        case ActionTypes.Update_Order_Front:
            const newOrderToShow = { ...state.ordersToShow };

            if (action.orderType === ActionTypes.Order_Type_ask) {
                const newAskOrder = [...state.ordersToShow['askOrders']]
                newAskOrder.pop();
                newAskOrder.unshift(action.element);
                newOrderToShow.askOrders = [...newAskOrder];
                // console.log('OrderListReducer', state.ordersToShow.askOrders === newOrderToShow.askOrders);
            } else {
                const newBidOrder = [...state.ordersToShow['bidOrders']]
                newBidOrder.pop();
                newBidOrder.unshift(action.element);
                newOrderToShow.bidOrders = [...newBidOrder];
                //  console.log('OrderListReducer', state.ordersToShow.bidOrders === newOrderToShow.bidOrders);
            }
            return {
                ...state, ordersToShow: newOrderToShow
            }

        case ActionTypes.Add_New_Orders:
            const newOrderToShow2 = { ...state.ordersToShow }

            if (action.orderType === ActionTypes.Order_Type_ask) {
                const newAskOrder = [...state.ordersToShow['askOrders']]
                newAskOrder.push(action.element);
                newOrderToShow2.askOrders = [...newAskOrder];
                //  console.log('OrderListReducer', state.ordersToShow.askOrders === newOrderToShow2.askOrders);
            } else {
                const newBidOrder = [...state.ordersToShow['bidOrders']]
                newBidOrder.push(action.element);
                newOrderToShow2.bidOrders = [...newBidOrder];
            }
            return {
                ...state, ordersToShow: newOrderToShow2
            }
        case ActionTypes.Clear_BidAsk_List_Orders: {
            const newOrderToShow = { ...state.ordersToShow };
            newOrderToShow['askOrders'] = [];
            newOrderToShow['bidOrders'] = [];
            newOrderToShow['minAskOrders'] = [];
            newOrderToShow['maxBidOrders'] = [];
            return {
                ...state, ordersToShow: newOrderToShow
            }
        }

        default:
            return state;
    }
}

export default OrderListReducer;