import React from 'react';
import './bookTraderComponent.css';
import { getInitialOrderList, getChartDataInitialOrderList } from '../../services/orderEntry.service';
import { connect } from 'react-redux';
// import { UpdateRecentOrders, AddNewOrders, AddTototalOrders, ClearTotalOrders } from '../../../common/store/actions/actionIndex';
import * as actiontypes from '../../../common/store/actions/actionIndex';
import AskComponent from './askComponent/askComponent';
import BidComponent from './bidComponent/bidComponent';
import { showToast } from '../../../common/component/toastMessages/toastcomponent';

class BookTrader extends React.Component {
    tradeOpen = true;

    componentDidMount() {
        this.fetchOrderList();
        this.fetchTotalOrderList();
        this.props.onLoadStockSymbols();
    }

    fetchOrderList = () => {
        const payload = {
            "productId": parseInt(this.props.bookOrderFormNewValue['stockSymbol']),
            "gameId": "001",
            "noOfRows": 20
        }
        getInitialOrderList(payload).then((res) => {
            if (res.data.success) {
                if (res.data['data']) {
                    this.setStateBasedOnOrderData(res.data['data']);
                    if (this.orderListInterval) {
                        clearInterval(this.orderListInterval);
                    }

                   // this.orderListInterval = setInterval(this.fetchOrderList, 3000);

                }
            }
        }, (err) => {
            this.tradeOpen = false;
            clearInterval(this.orderListInterval);
            // showToast('error', err);
        })
    }


    fetchTotalOrderList = () => {
        const payload = {
            productId: parseInt(this.props.bookOrderFormNewValue['stockSymbol']),
            gameId: "001"
        }
        getChartDataInitialOrderList(payload).then((res) => {
            if (res.data.success) {
                // console.log('ddd',res.data['data'][0]['askOrders'])
                if (res.data['data']) {
                    this.props.onAddToTotalAskOrders(res.data['data'][0]['askOrders']);
                    this.props.onAddToTotalBidOrders(res.data['data'][0]['bidOrders']);
                    // this.setStateBasedOnTotalOrders(res.data['data']);

                    if (this.orderTotalListInterval) {
                        clearInterval(this.orderTotalListInterval);
                    }
                    // this.orderTotalListInterval = setInterval(this.fetchTotalOrderList, 3000);
                }
            }
        }, (err) => {
            this.tradeOpen = false;
            // showToast('error', err);
        })
    }

    setStateBasedOnOrderData(data) {
        data.forEach((elem) => {
            if (elem['bidOffer'] === 'Ask') {
                if (this.props.askOrderList.length < this.props.totalOrdersToBeShown) {
                    this.props.onInitalOrdersFetch('ask', elem);
                } else {
                    this.props.onAddingRecentOrders('ask', elem);
                }
            } else {
                if (this.props.bidOrderList.length < this.props.totalOrdersToBeShown) {
                    this.props.onInitalOrdersFetch('bid', elem);
                } else {

                    this.props.onAddingRecentOrders('bid', elem);
                }
            }
        })
    }

    setStateBasedOnTotalOrders(data) {
        this.props.onClearTotalOrders();

        for (let i = 0; i < 100; i++) {
            if (data[i]['bidOffer'] === 'Ask') {
                this.props.addToTotalOrder('ask', data[i]);
            } else {
                this.props.addToTotalOrder('bid', data[i]);

            }
        }

        // data.forEach((elem) => {
        //     if (elem['bidOffer'] === 'Ask') {
        //         this.props.addToTotalOrder('ask', elem);
        //     } else {
        //         this.props.addToTotalOrder('bid', elem);

        //     }
        // })
    }

    componentWillUnmount() {
        clearInterval(this.orderListInterval);
    }

    productChange(event) {
        this.props.onUpdateProductValue({ [event.target.name]: event.target.value })
        this.props.onClearTotalOrders();
        this.props.onClearBidAskOrders();
        if (this.orderListInterval) {
            clearInterval(this.orderListInterval);
        }
        
        console.log('value',this.props.bookOrderFormNewValue['stockSymbol'])
        this.fetchOrderList();
        this.fetchTotalOrderList();
    }

    onClickPrice = (elem) => {
        console.log('elem', elem);
        this.props.onUpdateOrderFormValue({ 'transaction': elem['bidOffer'] })
        this.props.onUpdateOrderFormValue({ 'price': elem['price'] })
        this.props.onUpdateOrderFormValue({ 'quantity': elem['totalQty'] })
    }

    render() {
        const askBid = this.tradeOpen ? <div className="sub-div">
            <AskComponent orders={this.props.askOrderList}
                askPriceClicked={this.onClickPrice}>
            </AskComponent>
            <BidComponent orders={this.props.bidOrderList}
                bidPriceClicked={this.onClickPrice} >
            </BidComponent>
        </div> : <div className="sub-div"> No Trades to display</div>
        return (
            <div className="trader-div">
                <h3>Bid/Ask</h3>

                <div className="product-drop">
                    <select onChange={(e) => { this.productChange(e) }}
                        value={this.props.bookOrderFormNewValue['stockSymbol']}
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

                {askBid}
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
        onInitalOrdersFetch: (type, data) => {
            dispatch(actiontypes.AddNewOrders(type, data))
        },
        onAddingRecentOrders: (type, data) => {
            dispatch(actiontypes.UpdateRecentOrders(type, data))
        },
        addToTotalOrder: (type, data) => {
            dispatch(actiontypes.AddTototalOrders(type, data))
        },
        onClearTotalOrders: () => {
            dispatch(actiontypes.ClearTotalOrders());
        },
        onUpdateProductValue: (obj) => {
            dispatch(actiontypes.UpdateOrderFormValues(obj))
        },
        onLoadStockSymbols: () => {
            dispatch(actiontypes.LoadStockSymbol());
        },
        onUpdateOrderFormValue: (obj) => {
            dispatch(actiontypes.UpdateOrderFormValues(obj))
        },
        onAddToTotalAskOrders: (obj) => {
            dispatch(actiontypes.AddToTotalAskOrders(obj))
        },
        onAddToTotalBidOrders: (obj) => {
            dispatch(actiontypes.AddToTotalBidOrders(obj))
        },
        onClearBidAskOrders: () => {
            dispatch(actiontypes.ClearBidAskOrders());
        },
    }
}

const mapStateToProps = (state) => {
    console.log('statebooktrader',event.target.name,event.target.value);
    return {
        bidOrderList: state.orderListReducer['ordersToShow']['bidOrders'],
        askOrderList: state.orderListReducer['ordersToShow']['askOrders'],
        totalOrdersToBeShown: state.orderListReducer['totalOrdersToBeShown'],
        bookOrderFormNewValue: state.orderBookReducer.bookOrderFormValue,
        stockSymbol: state.fetchDataReducer.stockSymbols['data']
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(BookTrader);