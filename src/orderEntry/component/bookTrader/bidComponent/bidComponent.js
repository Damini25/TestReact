import React from 'react';
import './bidComponent.css';
import _ from 'lodash';
class BidComponent extends React.Component {

    randomNumber(minimum, maximum) {
        return Math.round(Math.random() * (maximum - minimum) + minimum);
    }

    render() {
        // const row = this.props.orders.map((elem) => {
        //     return (
        //         <tr key={elem['orderId']}>
        //             <td>{elem['price']}</td>
        //             <td>{elem['totalQty']}</td>
        //         </tr>
        //     );
        // })
        //  console.log('bid ordr',this.props.orders)

        const row = _.sortBy(this.props.orders, ['price','timestamp'],['desc','asc']).map((elem, i) => {
            const random = this.randomNumber(0, 1);
            return (
                <tr key={i} className={random === 1 ? 'backgroundBlue' : ''}>
                    <td>{elem['price']}</td>
                    <td>{elem['totalQty']}</td>
                </tr>
            );
        })

        return (
            <div>
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