import React from 'react';
import './bidComponent.css';
import _ from 'lodash';
class BidComponent extends React.Component {
   
    render() {
        // const row = this.props.orders.map((elem) => {
        //     return (
        //         <tr key={elem['orderId']}>
        //             <td>{elem['price']}</td>
        //             <td>{elem['totalQty']}</td>
        //         </tr>
        //     );
        // })
        console.log('bid ordr',this.props.orders)
        const row = _.sortBy(this.props.orders, ['price']).map((elem,i) => {
            return (
                <tr key={i}>
                    <td>{elem['price']}</td>
                    <td>{elem['totalQty']}</td>
                </tr>
            );
        })

        return (
            <div >
                <h3>Bid</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {row}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BidComponent;