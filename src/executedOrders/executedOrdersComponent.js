import React from 'react';
import './executedOrdersComponent.scss';

class ExecutedOrderList extends React.Component {
    render() {
        return (
            <div className="exec-orderlist-div">
                <h3>Executed Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Timestamp</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>BID/ASK</th>
                            <th>Filed</th>
                            <th>Volume</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>158</td>
                            <td>11:07:02</td>
                            <td>NCG</td>
                            <td>23.55</td>
                            <td>BID</td>
                            <td>0/1000</td>
                            <td>30</td>
                            <td>Executed</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExecutedOrderList