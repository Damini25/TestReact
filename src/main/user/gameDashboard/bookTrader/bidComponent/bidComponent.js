import React from 'react';
import './bidComponent.scss';
import _ from 'lodash';
import {getLocalStorage} from '../../../../../common/utilities/localStorageService';

class BidComponent extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }
  
    render() {
        const row = _.sortBy(this.props.orders, ['price','timestamp'],['asc', 'desc']).reverse().map((elem, i) => {
            return (
                <tr key={i} className={elem['traderId'] === parseInt(getLocalStorage('traderId')) ? 'backgroundBlue' : ''}>
                    <td>{elem['unfulfilledQuantity']}</td>
                    <td ><a  href="#" onClick={() => { this.props.bidPriceClicked(elem) }}>{elem['price']}</a></td>
                </tr>
            );
        })

        return (
            <div>
                <h3>Bid</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Volume</th>
                            <th>Price</th>
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