import React from 'react';
import './bookTraderComponent.css';
import { getOrderList } from '../../services/orderEntry.service';
import { connect } from 'react-redux';
import { AddToOrderList, AddNewOrReplaceOrderList } from '../../../common/store/actions/actionIndex';
import AskComponent from './askComponent/askComponent';
import BidComponent from './bidComponent/bidComponent';


class BookTrader extends React.Component {

    fetchOrderList = () => {
        getOrderList().then((res) => {
            if (res.data.success) {
                if (res.data['data']) {
                    this.setStateBasedOnOrderData(res.data['data']);
                    if (this.orderListInterval) {
                        clearInterval(this.orderListInterval);
                    } else {
                      //  this.orderListInterval = setInterval(this.fetchOrderListOnInterval, 2000);
                      this.fetchOrderListOnInterval();
                      this.fetchOrderListOnInterval();
                      this.fetchOrderListOnInterval();
                     
                    }
                }
            }
        }, (err) => {

        })
    }

    fetchOrderListOnInterval = () => {
        getOrderList().then((res) => {
            if (res.data.success) {
                if (res.data['data']) {
                    this.setStateBasedOnOrderData(res.data['data']);
                    // if (res.data['data'] < this.props.orderList.totalOrders) {
                    //     this.props.onAddRecentOrders(this.setStateBasedOnOrderData(res.data['data']));
                    // } else {
                    //     this.props.onInitalOrdersFetch(this.setStateBasedOnOrderData(res.data['data']));
                    // }
                }
            }
        }, (err) => {

        })
    }

    setStateBasedOnOrderData(data) {
        data.forEach((elem) => {
            if (elem['bidOffer'] === 'ask') {
                if (this.props.askOrderList.length < this.props.totalOrdersToBeShown) {
                    this.props.onInitalOrdersFetch('ask', elem);
                } else {
                    this.props.onAddingRecentOrders('ask', elem);
                }
            } else {
                if (this.props.bidOrderList.length < this.props.totalOrdersToBeShown) {
                    this.props.onInitalOrdersFetch('bid', elem);
                } else {
                    console.log('bid recent')
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
        console.log('sta',this.props.bidOrderList.length)
        return (
            <div className="trader-div">
                <h3>Book Trader</h3>
                <div className="sub-div">
                    <AskComponent orders={this.props.askOrderList}></AskComponent>
                    <BidComponent orders={this.props.bidOrderList}></BidComponent>
                </div>
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
        onInitalOrdersFetch: (type, data) => {
            dispatch(AddNewOrReplaceOrderList(type, data))
        },
        onAddingRecentOrders: (type, data) => {
            dispatch(AddToOrderList(type, data))
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