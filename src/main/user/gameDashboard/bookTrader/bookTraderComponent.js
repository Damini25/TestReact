import React from 'react';
import './bookTraderComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../../../../common/store/actions/actionIndex';
import AskComponent from './askComponent/askComponent';
import BidComponent from './bidComponent/bidComponent';
import { getLocalStorage } from '../../../../common/utilities/localStorageService';
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
            "gameId": parseInt(getLocalStorage('gameId')),
            "traderId": parseInt(getLocalStorage('traderId')),
            "noOfRows": 20
        }
        this.props.onLoadBidAskList(payload);

        if (this.orderListInterval) {
            clearInterval(this.orderListInterval);
        }

        /**
         * Play and Pause feature
         */
        if (this.props.playbackOrdersFlow) {
            if (this.gameCheckInterval) {
                clearInterval(this.gameCheckInterval);
            }
            this.orderListInterval = setInterval(this.fetchOrderList, getLocalStorage('orderFetchInterval'));
        } else {
            if (this.orderListInterval) {
                clearInterval(this.orderListInterval);
            }
            this.checkGameStatus();
        }
    }

    /**
     * API call to check game pause/play status
     */
    checkGameStatus = () => {
        const payload = {
            "productId": parseInt(this.props.bookOrderFormNewValue['stockSymbol']),
            "gameId": parseInt(getLocalStorage('gameId')),
            "traderId": parseInt(getLocalStorage('traderId')),
            "noOfRows": 20
        }
        this.props.onCheckGamePlayPaused(payload);
        if (this.gameCheckInterval) {
            clearInterval(this.gameCheckInterval);
        }
        this.gameCheckInterval = setInterval(this.checkGameStatus, 3000);
    }

    /**
     *Function call on product symbol change
     */
    productChange(event) {
        this.props.onUpdateProductValue({ 'stockSymbol': parseInt(event.target.value) });
        this.props.onClearMinMaxChartData();
    }

    /**
     *Function call to refresh bid/ask list and spread data on  product symbol change
     */
    componentDidUpdate(prevstate) {
        if (this.props.bookOrderFormNewValue['stockSymbol'] && prevstate.bookOrderFormNewValue['stockSymbol'] !== this.props.bookOrderFormNewValue['stockSymbol']) {
            if (this.orderListInterval) {
                clearInterval(this.orderListInterval);
            }
            this.props.onClearTotalOrders();
            this.props.onClearBidAskOrders();
            this.fetchOrderList();
        }
        /**
         * Play and pause game handling
         */
        if (this.gameCheckInterval && this.props.playbackOrdersFlow && prevstate['playbackOrdersFlow'] !== this.props.playbackOrdersFlow) {
            if (this.gameCheckInterval) {
                clearInterval(this.gameCheckInterval);
            }
            this.fetchOrderList();
        } else if (this.orderListInterval && !this.props.playbackOrdersFlow) {
            if (this.orderListInterval) {
                clearInterval(this.orderListInterval);
            }
            this.checkGameStatus();
        }
    }

    /**
     *Function call hyperlink-price click in bid/ask list
     */
    onClickPrice = (elem) => {
        this.props.onUpdateOrderFormValue({ 'transaction': elem['bidOffer'] === 'Ask' ? 'Bid' : 'Ask' })
        this.props.onUpdateOrderFormValue({ 'price': elem['price'] })
        this.props.onUpdateOrderFormValue({ 'quantity': elem['unfulfilledQuantity'] })
    }

    /**
     *  Clear interval when component is destroyed
     */
    componentWillUnmount() {
        clearInterval(this.orderListInterval);
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
        },
        onCheckGamePlayPaused: (payload) => {
            dispatch(actiontypes.CheckGamePlayPaused(payload));
        },
        loadNewsList: () => {
            dispatch(actiontypes.LoadNewsList());
        },
        onClearMinMaxChartData: () => {
            dispatch(actiontypes.ClearTotalMinMaxOrders())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bidOrderList: state.orderListReducer['ordersToShow']['bidOrders'],
        askOrderList: state.orderListReducer['ordersToShow']['askOrders'],
        totalOrdersToBeShown: state.orderListReducer['totalOrdersToBeShown'],
        bookOrderFormNewValue: state.orderBookReducer.bookOrderFormValue,
        stockSymbol: state.fetchDataReducer.stockSymbols['data'],
        traderId: state.fetchDataReducer['userDetails']['traderId'],
        gameSessionId: state.traderGameManagementReducer['gameSessionId'],
        playbackOrdersFlow: state.orderListReducer['playbackOrdersFlow'],
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(BookTrader);