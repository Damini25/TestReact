import React from 'react';
import './orderEntry.css';
import PLChart from '../component/pLChart/plChartComponent';
import SecurityChart from '../component/securityChart/securityChartComponent';
import BookNewOrder from '../component/bookNewOrder/bookNewOrderComponent';
import BookTrader from '../component/bookTrader/bookTraderComponent';
import NewsFeed from '../component/newsFeed/newsFeedComponent';
import TraderInfo from '../component/traderInfo/traderInfoComponent';

class EnterOrder extends React.Component {

    render() {
        return (
            <div>
                <div className="parent-div">
                    <TraderInfo></TraderInfo>
                    <PLChart className="sub-div"></PLChart>
                    <NewsFeed></NewsFeed>
                </div>
                <div className="parent-div">
                    <BookTrader></BookTrader>
                    <SecurityChart></SecurityChart>
                    <BookNewOrder></BookNewOrder>
                </div>
            </div>
        );
    }
}
export default EnterOrder;