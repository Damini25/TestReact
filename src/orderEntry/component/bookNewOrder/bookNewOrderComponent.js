import React from 'react';
import './bookNewOrderComponent.css';

class BookNewOrder extends React.Component {

    render() {
        const div1 = <div className="book-trade-div">
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
        </div>
        const div2 = <div className="book-trade-div2">
            <h3>Book Trade ---- <span>Book new order</span> </h3>
            <div className="sub-div2">
                <div>
                    <label>Stock Symbol</label>
                    <select>
                        <option>fb</option>
                        <option>wp</option>
                    </select>
                </div>
                <div>
                    <label>Transaction</label>
                    <select>
                        <option>Bid</option>
                        <option>Ask</option>
                    </select>
                </div>
                <div>
                    <label>Price</label>
                    <input />
                </div>
                <div>
                    <label>Quantity</label>
                    <input />
                </div>
                <div>
                    <button>EXECUTE</button>
                </div>
            </div>
        </div>

        return div1;
    }
}

export default BookNewOrder;