import * as ActionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    ordersToShow: {
        askOrders: [],
        bidOrders: [],
        // minAskOrders:[],
        // maxBidOrders:[]
    },
    totalOrdersToBeShown: 20
}

const OrderListReducer = (state = initialState, action) => {
  //  console.log('OrderListReducer', state, action);
    switch (action.type) {

        case ActionTypes.OnRecieve_BidAsk_Data: {

            console.log('bid/as', action)
            const newOrderToShow = { ...state.ordersToShow };
          
            newOrderToShow.askOrders = [...action['data'][0]['allAskOrders']];
            newOrderToShow.bidOrders = [...action['data'][0]['allBidOrders']];
            // newOrderToShow.minAskOrders=_.minBy(this.state['minMaxBidOrders'], (o) => {
            //     return o.order.price;
            // });
            // newOrderToShow.maxBidOrders=_.maxBy(this.state['minMaxBidOrders'], (o) => {
            //     return o.order.price;
            // });

        
            console.log('state', { ...state, ordersToShow: newOrderToShow })
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
            return {
                ...state, ordersToShow: newOrderToShow
            }
        }

        default:
            return state;
    }
}

export default OrderListReducer;