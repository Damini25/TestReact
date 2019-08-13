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
    console.log('state',state);
    switch (action.type) {
        case ActionTypes.Update_BookOrderForm_Values:
            const updatedOrderFormValue = { ...state.bookOrderFormValue, ...action.element };
            return {
                bookOrderFormValue: updatedOrderFormValue
            }

        default:
            return state;
    }
}

export default BookNewOrderReducer;