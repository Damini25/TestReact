import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    bookOrderFormValue: {
        stockSymbol: '1',
        transaction: 'Bid',
        price: '',
        quantity: ''
    }
}

const BookNewOrderReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.Update_BookOrderForm_Values:
            console.log('BookNewOrderReducer', action);
            const updatedOrderFormValue = { ...state.bookOrderFormValue };
            updatedOrderFormValue['stockSymbol'] = action['element']['stockSymbol'];
            console.log('BookNewOrderReducer', state.bookOrderFormValue, updatedOrderFormValue);

            return {
                ...state, bookOrderFormValue: {
                    ...state.bookOrderFormValue,
                    stockSymbol: updatedOrderFormValue['stockSymbol']
                }
            }

        case ActionTypes.Clear_BookOrderForm_Values:
            return {
                bookOrderFormValue: {
                    stockSymbol: '',
                    transaction: 'Bid',
                    price: '',
                    quantity: ''
                }
            }
        default:
            return state;
    }
}

export default BookNewOrderReducer;