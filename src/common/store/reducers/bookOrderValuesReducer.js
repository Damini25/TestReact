import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    bookOrderFormValue: {
        stockSymbol: 1,
        transaction: 'Bid',
        orderType:'',
        price: '',
        quantity: ''
    }
}

const BookNewOrderReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.Update_BookOrderForm_Values:
            const updatedOrderFormValue = { ...state.bookOrderFormValue, ...action.element };
            return {
                bookOrderFormValue: updatedOrderFormValue
            }

        case ActionTypes.Clear_BookOrderForm_Values:
            const clearData = { ...state['bookOrderFormValue'] }
            clearData['transaction'] = 'Bid';
            clearData['orderType'] = ''
            clearData['price'] = '';
            clearData['quantity'] = ''
            // const clearData={
            //     transaction: 'Bid',
            //     price: '',
            //     quantity: ''
            // }
            return {
                ...state, bookOrderFormValue: clearData
            }
        default:
            return state;
    }
}

export default BookNewOrderReducer;