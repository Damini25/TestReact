import React from 'react';
import './orderEntry.css';
import { env } from '../../common/environment';
import { bookNewOrder } from '../services/orderEntry.service';
import PLChart from '../component/pLChart/plChartComponent';
import SecurityChart from '../component/securityChart/securityChartComponent';
import BookNewOrder from '../component/bookNewOrder/bookNewOrderComponent';
import BookTrader from '../component/bookTrader/bookTraderComponent';
import NewsFeed from '../component/newsFeed/newsFeedComponent';
import TraderInfo from '../component/traderInfo/traderInfoComponent';

class EnterOrder extends React.Component {

    onBookNewOrder = (event) => {
        event.preventDefault();
        console.log('orderData',event);
        /*bookNewOrder(payload).then(() => {
        });*/
    }

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
                    <BookNewOrder bookOrderClicked={(event)=>{this.onBookNewOrder(event)}}></BookNewOrder>
                </div>
            </div>
        );
    }
}
export default EnterOrder;