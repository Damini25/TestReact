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
    }

    fetchOrderList = () => {
        const payload = {
            "productId" : "001",
            "gameId" : "001",
            "noOfRows" : 20
        } 
        getInitialOrderList(payload).then((res) => {
            if (res.data.success) {
                if (res.data['data']) {
                    this.setStateBasedOnOrderData(res.data['data']);
                    if (this.orderListInterval) {
                        clearInterval(this.orderListInterval);
                    }
                    //else {
                    //    this.fetchOrderListOnInterval();
                   //    this.orderListInterval = setInterval(this.fetchOrderList, 3000);
                    //  }
                }
            }
        }, (err) => {
            this.tradeOpen = false;
            clearInterval(this.orderListInterval);
            // showToast('error', err);
        })
    }

    /*   fetchOrderListOnInterval = () => {
           const payload = {
               productId: "001",
               gameId: "001"
           }
           getInitialOrderList(payload).then((res) => {
               if (res.data.success) {
                   if (res.data['data']) {
                       this.setStateBasedOnOrderData(res.data['data']);
                   }
               }
           }, (err) => {
   
           })
       }
   */

    fetchTotalOrderList = () => {
        const payload = {
            productId: "001",
            gameId: "001"
        }
        getChartDataInitialOrderList(payload).then((res) => {
            if (res.data.success) {
                if (res.data['data']) {
                     this.setStateBasedOnTotalOrders(res.data['data']);
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
    }

    render() {
        const askBid = this.tradeOpen ? <div className="sub-div">
            <AskComponent orders={this.props.askOrderList}></AskComponent>
            <BidComponent orders={this.props.bidOrderList}></BidComponent>
        </div> : <div className="sub-div"> No Trades to display</div>
        return (
            <div className="trader-div">
                <h3>Book Trader</h3>
                {/* <div className="product-drop">
                    <select value={this.props.stockSymbol} 
                        onChange={(e) => { this.productChange(e) }}
                        name="stockSymbol">
                        <option disabled  defaultValue="Select Stock Symbol">Select Stock Symbol:</option>
                        <option value="fb">fb</option>
                        <option value="wp">wp</option>
                    </select>
                </div> */}
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
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bidOrderList: state.orderListReducer['ordersToShow']['bidOrders'],
        askOrderList: state.orderListReducer['ordersToShow']['askOrders'],
        totalOrdersToBeShown: state.orderListReducer['totalOrdersToBeShown'],
        stockSymbol: state.orderBookReducer.bookOrderFormValue['stockSymbol']
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(BookTrader);