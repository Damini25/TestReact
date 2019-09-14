import React from 'react';
import './portfolioComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../common/store/actions/actionIndex';
import { getLocalStorage } from '../common/localStorageService';

class PortfolioComponent extends React.Component {
  
    componentDidMount() {
      //  this.fetchPortfolioList();
    }

    /**
      * API call to fetch Portfolios List data
      */
    fetchPortfolioList = () => {
        const payload = {
            "productId": parseInt(this.props.bookOrderFormNewValue['stockSymbol']),
            "noOfRows": 20
        }
        this.props.onLoadPortfolioList(payload);
    }

    render() {

        /*let row = [];
        if (this.state.dataToShow && this.state.dataToShow.length) {
            row = this.state.dataToShow.map((elem, i) => {
                const time= this.state.tradeTabActive ? elem['orderExecutionTime']:elem['orderTime']
                const d = new Date(time);
                const date = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
               
                return (
                    <tr key={i}>
                        <td>{date}</td>
                        <td>{elem['bidOffer']}</td>
                        <td>{elem['price']}</td>
                        <td>{elem['unfulfilledQuantity']}</td>
                        <td>{elem['orderStatusId']}</td>
                    </tr>
                );
            })
        }*/

        return (
            <div className="portfolio-list-div">
                {/* <h3>Executed Orders</h3> */}
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Type</th>
                                <th>Contract Size</th>
                                <th>Position</th>
                                <th>Cost</th>
                                <th>Last</th>
                                <th>Bid</th>
                                <th>Ask</th>
                                <th>Realized P&L</th>
                                <th>Unrealized P&L</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
        onLoadPortfolioList: (payload) => {
            dispatch(actiontypes.LoadPortfolioList(payload));
        }
    }
}
const mapStateToProps = (state) => {
    // console.log('stateExecutedOrderList', state.fetchDataReducer['bookedOrders'],
    // state.fetchDataReducer['executedOrders']);
    return {
        bookedOrdersList: state.fetchDataReducer['bookedOrders'],
        executedOrdersList: state.fetchDataReducer['executedOrders'],
        bookOrderFormNewValue: state.orderBookReducer.bookOrderFormValue,
        traderId: state.fetchDataReducer['userDetails']['traderId']
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(PortfolioComponent)