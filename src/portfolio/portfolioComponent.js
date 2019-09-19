import React from 'react';
import './portfolioComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../common/store/actions/actionIndex';
import { getLocalStorage } from '../common/localStorageService';

class PortfolioComponent extends React.Component {

    componentDidMount() {
        this.fetchPortfolioList();
    }

    componentDidUpdate(prevProps){
         /**
         * Play and Pause feature
         */
        if (this.fetchPortfolioListInterval && !this.props.playbackOrdersFlow) {
            if (this.fetchPortfolioListInterval) {
                clearInterval(this.fetchPortfolioListInterval);
            }
        } else if (this.props.playbackOrdersFlow && prevProps['playbackOrdersFlow'] !== this.props.playbackOrdersFlow) {
            this.fetchPortfolioList();
        }
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
        if (this.fetchPortfolioListInterval) {
            clearInterval(this.fetchPortfolioListInterval);
        }
        if (!this.props.playbackOrdersFlow) {
            if (this.fetchPortfolioListInterval) {
                clearInterval(this.fetchPortfolioListInterval);
            }
        }
        this.fetchPortfolioListInterval = setInterval(this.fetchPortfolioList, getLocalStorage('orderFetchInterval'));
    }

    render() {
        let row = [];
        if (this.props.portFolioList && this.props.portFolioList.length) {
            row = this.props.portFolioList.map((elem, i) => {
                let statusColorCode;
                if (elem['colorCoding'] === 1) {
                    statusColorCode = 'show-green';
                } else if (elem['colorCoding'] === -1) {
                    statusColorCode = 'show-red';
                } else {
                    statusColorCode = 'show-white';
                }
                return (
                    <tr key={i}>
                        <td>{elem['ticker']}</td>
                        <td>{elem['productType']}</td>
                        <td>{elem['contractSize']}</td>
                        <td>{elem['position']}</td>
                        <td>{elem['cost']}</td>
                        <td className={statusColorCode}>{elem['last']}</td>
                        <td className={statusColorCode}>{elem['bid']}</td>
                        <td className={statusColorCode}>{elem['ask']}</td>
                        <td>{elem['realizedPnl']}</td>
                        <td>{elem['unrealizedPnl']}</td>
                    </tr>
                );
            })
        }

        return (
            <div className="portfolio-list-div">
                <h3>Portfolio/Position</h3>
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Ticker</th>
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
                            {row}
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
        traderId: state.fetchDataReducer['userDetails']['traderId'],
        portFolioList: state.fetchDataReducer['portFolioList'],
        playbackOrdersFlow: state.orderListReducer['playbackOrdersFlow']
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(PortfolioComponent)