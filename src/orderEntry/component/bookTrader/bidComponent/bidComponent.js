import React from 'react';
import './bidComponent.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actiontypes from '../../../../common/store/actions/actionIndex';

class BidComponent extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }
    randomNumber(minimum, maximum) {
        return Math.round(Math.random() * (maximum - minimum) + minimum);
    }

    priceClicked(elem) {
        console.log('ee', elem)
        //onClick={() => { this.props.bidPriceClicked(elem) }}
    }

    render() {
        const row = _.sortBy(this.props.orders, [this.props['price'], this.props['timestamp']], ['desc', 'asc']).map((elem, i) => {
            const random = this.randomNumber(0, 1);
            return (
                <tr key={i} className={random === 1 ? 'backgroundBlue' : ''}>
                    <td><a  href="#">{elem['price']}</a></td>
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