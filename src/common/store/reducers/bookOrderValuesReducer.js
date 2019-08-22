import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    bookOrderFormValue: {
        stockSymbol: '',
        transaction: '',
        price: '',
        quantity: ''
    }
}

const BookNewOrderReducer = (state = initialState, action) => {
    // console.log('BookNewOrderReducer',state);
    switch (action.type) {
        case ActionTypes.Update_BookOrderForm_Values:
            const updatedOrderFormValue = { ...state.bookOrderFormValue, ...action.element };
            return {
                bookOrderFormValue: updatedOrderFormValue
            }
        case ActionTypes.Clear_BookOrderForm_Values:
            return {
                bookOrderFormValue: {
                    stockSymbol: '',
                    transaction: '',
                    price: '',
                    quantity: ''
                }
            }
        default:
            return state;
    }
}

export default BookNewOrderReducer;