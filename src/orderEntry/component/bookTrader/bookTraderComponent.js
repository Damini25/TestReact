import React from 'react';
import './bookTraderComponent.scss';
//import { getInitialOrderList} from '../../services/orderEntry.service';
import { connect } from 'react-redux';
// import { UpdateRecentOrders, AddNewOrders, AddTototalOrders, ClearTotalOrders } from '../../../common/store/actions/actionIndex';
import * as actiontypes from '../../../common/store/actions/actionIndex';
import AskComponent from './askComponent/askComponent';
import BidComponent from './bidComponent/bidComponent';
import {getLocalStorage} from '../../../common/localStorageService';
import _ from 'lodash';

class BookTrader extends React.Component {
    tradeOpen = true;
    state = {
        minMaxAskOrders: [],
        minMaxBidOrders: []
    }
    componentDidMount() {
        this.fetchOrderList();
        this.props.onLoadStockSymbols();
    }

    /**
     * API call to fetch Bid/Ask List data
     */
    fetchOrderList = () => {
        const payload = {
            "productId": parseInt(this.props.bookOrderFormNewValue['stockSymbol']),
            "gameId": 1,
            "traderId": parseInt(getLocalStorage('traderId')),
            "noOfRows": 20
        }
        this.props.onLoadBidAskList(payload);

        if (this.orderListInterval) {
            clearInterval(this.orderListInterval);
        }
        
        this.orderListInterval = setInterval(this.fetchOrderList, 3000);
       /* getInitialOrderList(payload).then((res) => {
            if (res.data.success) {
                if (res.data['data']) {
                    this.setStateBasedOnOrderData(res.data['data']);
                    //  this.setStateForMinMaxTotalOrder(res.data['data']);
                    if (this.orderListInterval) {
                        clearInterval(this.orderListInterval);
                    }
                      this.orderListInterval = setInterval(this.fetchOrderList, 3000);

                }
            }
        }, (err) => {
            this.tradeOpen = false;
            clearInterval(this.orderListInterval);
            // showToast('error', err);
        })*/
    }

    /**
    * function call to set state on basis of bid/ask data from api
    */
    setStateBasedOnOrderData(data) {
        this.setState({
            minMaxAskOrders: [],
            minMaxBidOrders: []
        })
        data.forEach((elem) => {
            if (elem['bidOffer'] === 'Ask') {
                if (this.props.askOrderList.length < this.props.totalOrdersToBeShown) {
                    this.props.onInitalOrdersFetch('ask', elem);
                } else {
                    this.props.onAddingRecentOrders('ask', elem);
                }
                this.setState({
                    ...this.state,
                    minMaxAskOrders: this.state.minMaxAskOrders.concat({
                        order: elem
                    })
                })
            } else {
                if (this.props.bidOrderList.length < this.props.totalOrdersToBeShown) {
                    this.props.onInitalOrdersFetch('bid', elem);
                } else {

                    this.props.onAddingRecentOrders('bid', elem);
                }
                this.setState({
                    ...this.state,
                    minMaxBidOrders: this.state.minMaxBidOrders.concat({
                        order: elem
                    })
                })
            }
        })
        const minAskPrice = _.minBy(this.state['minMaxAskOrders'], (o) => {
            return o.order.price;
        });
        const maxBidPrice = _.maxBy(this.state['minMaxBidOrders'], (o) => {
            return o.order.price;
        });
        //   console.log('minmax', this.state, minAskPrice, maxBidPrice);
        const time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        if (minAskPrice && maxBidPrice) {
            this.props.onAddMinMaxTotalAskOrders({ minAsk: minAskPrice, time: time });
            this.props.onAddMinMaxTotalBidOrders({ maxBid: maxBidPrice, time: time });
        }
    }

    /**
     * Function call when component is destroyed
     */
    componentWillUnmount() {
        clearInterval(this.orderListInterval);
    }

    /**
     *Function call on product symbol change
     */
    productChange(event) {
        this.props.onUpdateProductValue({ 'stockSymbol': parseInt(event.target.value) })
    }

    /**
     *Function call to refresh bid/ask list and spread data on  product symbol change
     */
    componentDidUpdate(prevstate) {
        if (this.props.bookOrderFormNewValue['stockSymbol'] && prevstate.bookOrderFormNewValue['stockSymbol'] !== this.props.bookOrderFormNewValue['stockSymbol']) {
            //  console.log('com', prevstate.bookOrderFormNewValue, this.props.bookOrderFormNewValue)
            if (this.orderListInterval) {
                clearInterval(this.orderListInterval);
            }
            this.props.onClearTotalOrders();
            this.props.onClearBidAskOrders();
            this.fetchOrderList();
        }
       
        // if (!getLocalStorage('gameSessionId') || !this.props.gameSessionId) {
        //     this.props.history.push("/mainNav/joinGame");
        // }
    }

    /**
     *Function call hyperlink-price click in bid/ask list
     */
    onClickPrice = (elem) => {
      //  console.log('elem', elem);
        this.props.onUpdateOrderFormValue({ 'transaction': elem['bidOffer'] === 'Ask' ? 'Bid' : 'Ask' })
        this.props.onUpdateOrderFormValue({ 'price': elem['price'] })
        this.props.onUpdateOrderFormValue({ 'quantity': elem['unfulfilledQuantity'] })
    }

    render() {
        const askBid = this.tradeOpen ? <div className="sub-div">
            <BidComponent orders={this.props.bidOrderList}
                bidPriceClicked={this.onClickPrice} >
            </BidComponent>
            <AskComponent orders={this.props.askOrderList}
                askPriceClicked={this.onClickPrice}>
            </AskComponent>
        </div> : <div className="sub-div"> No Trades to display</div>
        return (
            <div className="trader-div">
                <h3>Bid/Ask</h3>
                {askBid}
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
        onLoadBidAskList: (payload) => {
            dispatch(actiontypes.LoadBidAskList(payload))
        },
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
        onAddMinMaxTotalAskOrders: (data) => {
            dispatch(actiontypes.AddMinMaxTotalAskOrders(data));
        },
        onAddMinMaxTotalBidOrders: (data) => {
            dispatch(actiontypes.AddMinMaxTotalBidOrders(data));
        }
    }
}

const mapStateToProps = (state) => {
    // console.log('statebooktrader', state);
    // console.log('statebooktrader', state.orderBookReducer.bookOrderFormValue);
    return {
        bidOrderList: state.orderListReducer['ordersToShow']['bidOrders'],
        askOrderList: state.orderListReducer['ordersToShow']['askOrders'],
        totalOrdersToBeShown: state.orderListReducer['totalOrdersToBeShown'],
        bookOrderFormNewValue: state.orderBookReducer.bookOrderFormValue,
        stockSymbol: state.fetchDataReducer.stockSymbols['data'],
        traderId:state.fetchDataReducer['userDetails']['traderId'],
        gameSessionId: state.traderGameManagementReducer['gameSessionId']
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(BookTrader);