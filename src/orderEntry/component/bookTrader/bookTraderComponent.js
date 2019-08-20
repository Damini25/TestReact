import React from 'react';
import './bookTraderComponent.css';
import { getInitialOrderList } from '../../services/orderEntry.service';
import { connect } from 'react-redux';
import { UpdateRecentOrders, AddNewOrders } from '../../../common/store/actions/actionIndex';
import AskComponent from './askComponent/askComponent';
import BidComponent from './bidComponent/bidComponent';
import { showToast } from '../../../common/component/toastMessages/toastcomponent';

class BookTrader extends React.Component {
    tradeOpen = true;
    fetchOrderList = () => {
        const payload = {
            productId: "001",
            gameId: "001"
        }
        getInitialOrderList(payload).then((res) => {
            if (res.data.success) {
                if (res.data['data']) {
                    this.setStateBasedOnOrderData(res.data['data']);
                    if (this.orderListInterval) {
                        clearInterval(this.orderListInterval);
                    } else {
                        this.fetchOrderListOnInterval();
                    // this.orderListInterval = setInterval(this.fetchOrderListOnInterval, 3000);
                    }
                }
            }
        }, (err) => {
            this.tradeOpen = false;
            // showToast('error', err);
        })
    }

    fetchOrderListOnInterval = () => {
        const payload = {
            productId: "001",
            gameId: "001"
        }
        getInitialOrderList(payload).then((res) => {
            //showToast('success', 'Data recieved');
            if (res.data.success) {
                if (res.data['data']) {
                    this.setStateBasedOnOrderData(res.data['data']);
                }
            }
        }, (err) => {

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

    componentDidMount() {
        this.fetchOrderList();
    }

    componentWillUnmount() {
        clearInterval(this.orderListInterval);
    }

    render() {

        const askBid = this.tradeOpen ? <div className="sub-div">
            <AskComponent orders={this.props.askOrderList}></AskComponent>
            <BidComponent orders={this.props.bidOrderList}></BidComponent>
        </div> : <div className="sub-div"> No Trades to display</div>

        return (

            <div className="trader-div">
                <h3>Book Trader</h3>
                {askBid}
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
        onInitalOrdersFetch: (type, data) => {
            dispatch(AddNewOrders(type, data))
        },
        onAddingRecentOrders: (type, data) => {
            dispatch(UpdateRecentOrders(type, data))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bidOrderList: state.orderListReducer['ordersToShow']['bidOrders'],
        askOrderList: state.orderListReducer['ordersToShow']['askOrders'],
        totalOrdersToBeShown: state.orderListReducer['totalOrdersToBeShown']
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(BookTrader);