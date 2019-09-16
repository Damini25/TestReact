import React from 'react';
import './bookNewOrderComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../../../common/store/actions/actionIndex';
//import { showToast } from '../../../common/component/toastMessages/toastcomponent';
import { bookNewOrder } from '../../services/orderEntry.service';
import {getLocalStorage} from '../../../common/localStorageService';

class BookNewOrder extends React.Component {
    state = {
        showSuccessMessage: false
    }

    handleChange = (event) => {
        //  console.log('value', event.target.name, event.target.value);
        const val=event.target.name ==='stockSymbol' ? parseInt(event.target.value):event.target.value;
        this.props.onUpdateOrderFormValue({ [event.target.name]: val })
    }

    executeOrder = (event) => {
        event.preventDefault();
        console.log('formValurs', this.props.formValues);
        // this.setState({
        //     showSuccessMessage: true
        // })
        // setTimeout(() => {
        //     this.setState({
        //         showSuccessMessage: false
        //     })
        // }, 5000);
        // this.props.onResetOrderFormValues();
        this.postBookOrderData(this.props.formValues);
    }


    postBookOrderData(formvalues) {
        const payload = {
            "gameId": parseInt("001"),
            "traderId":  getLocalStorage('traderId'),
            "productId": parseInt(formvalues['stockSymbol']),
            "unfulfilledQuantity": null,
            "totalQty": parseFloat(formvalues['quantity']),
            "bidOffer": formvalues['transaction'],
            "currencyId": null,
            "price": parseFloat(formvalues['price']),
            "orderTypeId": parseInt(formvalues['orderType']),
            "orderTime": Date.now(),
            "orderStatusId": null
        }
        bookNewOrder(payload).then((res) => {
            // if (res.data.success) {
            this.setState({
                showSuccessMessage: true
            })
            setTimeout(() => {
                this.setState({
                    showSuccessMessage: false
                })
            }, 2000);
            this.props.onResetOrderFormValues();
            // const payload2 = {
            //     "productId": parseInt(this.props.bookOrderFormNewValue['stockSymbol']),
            //     "gameId": 1,
            //     "traderId": parseInt(this.props.traderId),
            //     "noOfRows": 20
            // }
            // this.props.onLoadBookedOrders(payload2);
            //   }
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
                            <label>Product Name</label>
                            <select onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['stockSymbol']}
                                name="stockSymbol">

                                <option disabled value="">Select product name</option>
                                {this.props.stockSymbol && this.props.stockSymbol.length ?
                                    this.props.stockSymbol.map((elem) => {
                                        return (
                                            <option key={elem['productId']} value={elem['productId']}>
                                                {elem['productCode'] + '-' + elem['productName']}
                                            </option>
                                        )
                                    }) : ''}
                            </select>
                        </div>
                        <div>
                            <label>Transaction</label>
                            <div className="transaction-radio-div">
                                <input
                                    type="radio"
                                    name="transaction"
                                    value="Bid"
                                    id="bid"
                                    checked={this.props.formValues['transaction'] === 'Bid'}
                                    onChange={(e) => { this.handleChange(e) }}
                                />
                                <label htmlFor="bid">Buy</label>
                            </div>
                            <div className="transaction-radio-div">
                                <input
                                    type="radio"
                                    name="transaction"
                                    value="Ask"
                                    id="ask"
                                    checked={this.props.formValues['transaction'] === 'Ask'}
                                    onChange={(e) => { this.handleChange(e) }}
                                />
                                <label htmlFor="ask">Sell</label>
                            </div>

                            {/* <select onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['transaction']}
                                name="transaction">
                                <option disabled value="">Select transaction type</option>
                                <option value="bid">Bid</option>
                                <option value="ask">Ask</option>
                            </select> */}
                        </div>
                        <div>
                            <label>Order Type</label>
                            <select onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['orderType']}
                                name="orderType">

                                <option disabled value="">Select order type</option>

                                <option value='1'>
                                    Market
                                </option>

                                <option value='2'>
                                    Limit
                                </option>
                            </select>
                        </div>
                        {this.props.formValues['orderType']==='2' ? <div>
                            <label>Price</label>
                            <input type="number" autoComplete="off" onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['price']} name="price" />
                        </div> : ""}
                        <div>
                            <label>Quantity</label>
                            <input type="number" autoComplete="off" onChange={(e) => { this.handleChange(e) }}
                                value={this.props.formValues['quantity']} name="quantity" />
                        </div>
                        <div>
                            <button type="submit" disabled={!this.props.playbackOrdersFlow}>EXECUTE</button>
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
        defaultStockSymbol: 'Select stock symbol',
        bookOrderFormNewValue: state.orderBookReducer.bookOrderFormValue,
        traderId:state.fetchDataReducer['userDetails']['traderId'],
        playbackOrdersFlow: state.orderListReducer['playbackOrdersFlow']
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateOrderFormValue: (obj) => {
            dispatch(actiontypes.UpdateOrderFormValues(obj))
        },
        onResetOrderFormValues: () => {
            dispatch(actiontypes.ResetOrderFormValues())
        },
        onLoadBookedOrders: (payload) => {
            dispatch(actiontypes.LoadBookedOrders(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookNewOrder);