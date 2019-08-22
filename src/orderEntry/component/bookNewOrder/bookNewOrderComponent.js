import React from 'react';
import './bookNewOrderComponent.css';
import { connect } from 'react-redux';
import * as actiontypes from '../../../common/store/actions/actionIndex';
import { showToast } from '../../../common/component/toastMessages/toastcomponent';
import {bookNewOrder} from '../../services/orderEntry.service';

class BookNewOrder extends React.Component {
    state = {
        showSuccessMessage: false
    }

    handleChange = (event) => {
        //  console.log('value', event.target.name, event.target.value);
        this.props.onUpdateOrderFormValue({ [event.target.name]: event.target.value })
    }

    executeOrder = (event) => {
        event.preventDefault();
        console.log('formValurs', this.props.formValues);
        this.postBookOrderData(this.props.formValues);
    }


    postBookOrderData(formvalues) {
        const payload = {
            gameId: '001',
            "traderId": '001',
            "productId": formvalues['stockSymbol'],
            "unfulfilledQuantity": '',
            "totalQty": formvalues['quantity'],
            "bidOffer": formvalues['transaction'],
            "currencyId": '',
            "price": formvalues['price'],
            "orderTypeId": '',
            "orderTime": '',
            "orderStatusId": ''
        }
        bookNewOrder(payload).then((res) => {
            if (res.data.success) {
                this.setState({
                    showSuccessMessage: true
                })
                setTimeout(() => {
                    this.setState({
                        showSuccessMessage: false
                    })
                }, 2000);
                this.props.onResetOrderFormValues();
            }
        }, (err) => {
            // showToast('error', err);
        })
    }

    render() {
        const div2 =
            <form className="book-trade-div2" onSubmit={(e) => { this.executeOrder(e) }}>
                <div >
                    <h3>Book Trade ---- <span>Book new order</span> </h3>
                    <div className="sub-div2">
                        <div>
                            <label>Stock Symbol</label>
                            <select onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['stockSymbol']}

                                name="stockSymbol">

                                <option disabled value="">Select stock symbol</option>
                                {this.props.stockSymbol && this.props.stockSymbol.length ?
                                    this.props.stockSymbol.map((elem) => {
                                        return (
                                            <option key={elem['productId']} value={elem['productCode']}>
                                                {elem['productCode'] + '-' + elem['productName']}
                                            </option>
                                        )
                                    }) : ''}
                            </select>
                        </div>
                        <div>
                            <label>Transaction</label>
                            <select onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['transaction']}
                                name="transaction">
                                <option disabled value="">Select transaction type</option>
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
                {this.state.showSuccessMessage ? <div className="success-msg-div">Order is booked successfully</div> : null}
            </form>

        return div2;
    }
}

const mapStateToProps = (state) => {
    return {
        formValues: state.orderBookReducer.bookOrderFormValue,
        stockSymbol: state.fetchDataReducer.stockSymbols['data'],
        defaultStockSymbol: 'Select stock symbol'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateOrderFormValue: (obj) => {
            dispatch(actiontypes.UpdateOrderFormValues(obj))
        },
        onResetOrderFormValues: () => {
            dispatch(actiontypes.ResetOrderFormValues())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookNewOrder);