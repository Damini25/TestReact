import React from 'react';
import './orderEntry.scss';
import SecurityChart from '../component/securityChart/securityChartComponent';
import BookNewOrder from '../component/bookNewOrder/bookNewOrderComponent';
import BookTrader from '../component/bookTrader/bookTraderComponent';
import ExecutedOrders from '../../executedOrders/executedOrdersComponent';
import PortfolioList from '../../portfolio/portfolioComponent';



class EnterOrder extends React.Component {

    render() {
        return (
            <div className="main-div-orderEntry">
                <div className="news-ribbon">
                </div>
                <div className="parent-div">
                    <PortfolioList></PortfolioList>
                    <ExecutedOrders></ExecutedOrders>
                </div>
                <div className="parent-div">
                    <BookTrader></BookTrader>
                    <SecurityChart></SecurityChart>
                    <BookNewOrder bookOrderClicked={(event) => { this.onBookNewOrder(event) }}></BookNewOrder>
                </div>
            </div>
        );
    }
}

export default (EnterOrder);