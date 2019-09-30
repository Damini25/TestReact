import React from 'react';
import './askComponent.scss';
import _ from 'lodash';
import {getLocalStorage} from '../../../../../common/utilities/localStorageService';

class AskComponent extends React.Component {
    constructor(props){
        super();
        this.props=props;
    }

    render() {
        const row = _.sortBy(this.props.orders, ['price','timestamp'],['asc','desc']).map((elem,i) => {
            return (
                <tr key={i} className={elem['traderId'] === parseInt(getLocalStorage('traderId')) ? 'backgroundBlue' : ''}>
                    <td><a href="#" onClick={() => { this.props.askPriceClicked(elem) }}>{elem['price']}</a></td>
                    <td>{elem['unfulfilledQuantity']}</td>
                </tr>
            );
        })
        
        return (
            <div >
                <h3>Ask</h3>
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

export default AskComponent;