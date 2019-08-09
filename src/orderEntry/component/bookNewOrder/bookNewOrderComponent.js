import React from 'react';
import  './bookNewOrderComponent.css';

class BookNewOrder extends React.Component {

    render() {
        return (<div className="book-trade-div">
            <h3>Book Trade ---- <span>Book new order</span> </h3>
            <div className="sub-div">
                <div>
                    <label>Ticker </label><span> Tpc</span>
                </div>
                <div>
                    <label>Price </label><span> 27.15</span>
                </div>
                <div>
                    <label>Type </label><span> Bid</span>
                </div>
                <div>
                    <label>Quantity </label><span> 100</span>
                </div>
                <div><button>EXECUTE</button></div>
                
            </div>
        </div>);
    }
}

export default BookNewOrder;