import React from 'react';
import './bookNewOrderComponent.css';
import { connect } from 'react-redux';
import * as actiontypes from '../../../common/store/actions/actionIndex';
import { showToast } from '../../../common/component/toastMessages/toastcomponent';

class BookNewOrder extends React.Component {

    handleChange = (event) => {
        //  console.log('value', event.target.name, event.target.value);
        this.props.onUpdateOrderFormValue({ [event.target.name]: event.target.value })
    }
    executeOrder = (event) => {
        event.preventDefault();
       // console.log('formValurs',this.props.formValues);
        showToast('success', 'Order is booked successfully');
    }

    render() {
        const div1 = <div className="book-trade-div">
            <h3>Book Trade ---- <span>Book new order</span> </h3>
            <div className="sub-div">
                <div>
                    <label>Ticker </label><span> Tpc</span>
                </div>
                <div>
                    <label>Price </label><span> 27.15</span>
                </div>
                <div>
                    <label>Type </label><span> Bid</span>
                </div>
                <div>
                    <label>Quantity </label><span> 100</span>
                </div>
                <div><button>EXECUTE</button></div>

            </div>
        </div>
        const div2 =
            <form className="book-trade-div2" onSubmit= {(e)=>{this.executeOrder(e)} }>
                <div >
                    <h3>Book Trade ---- <span>Book new order</span> </h3>
                    <div className="sub-div2">
                        <div>
                            <label>Stock Symbol</label>
                            <select onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['stockSymbol']} name="stockSymbol">
                                <option disabled defaultValue="Select Stock Symbol">Select Stock Symbol:</option>
                                <option value="fb">fb</option>
                                <option value="wp">wp</option>
                            </select>
                        </div>
                        <div>
                            <label>Transaction</label>
                            <select onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['transaction']} name="transaction">
                                <option value="bid">Bid</option>
                                <option value="ask">Ask</option>
                            </select>
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['price']} name="price" />
                        </div>
                        <div>
                            <label>Quantity</label>
                            <input type="number" onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['quantity']} name="quantity" />
                        </div>
                        <div>
                            <button type="submit">EXECUTE</button>
                        </div>
                    </div>
                </div>
            </form>

        return div2;
    }
}

const mapStateToProps = (state) => {
    return {
        formValues: state.orderBookReducer.bookOrderFormValue
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // {stockSymbol : newValue}
        onUpdateOrderFormValue: (obj) => {
            dispatch(actiontypes.UpdateOrderFormValues(obj))
        }
    }
}
// export default BookNewOrder;
export default connect(mapStateToProps, mapDispatchToProps)(BookNewOrder);