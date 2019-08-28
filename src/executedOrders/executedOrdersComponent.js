import React from 'react';

class ExecutedOrderList extends React.Component {
    render() {
        return (
            <div>
                <h3>Executed Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Timestamp</th>
                            <th>Tick</th>
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExecutedOrderList