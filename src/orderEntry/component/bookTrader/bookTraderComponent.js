import React from 'react';
import './bookTraderComponent.css';

class BookTrader extends React.Component {

    render() {
        return (<div className="trader-div">
            <h3>Book Trader</h3>
            <div className="sub-div">
                <div>
                    <h3>Ask</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Price</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>28.15</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>27.15</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>20.15</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bid-ask-div">
                    <h3>Bid</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Price</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>28.15</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>27.15</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>20.15</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}

export default BookTrader;