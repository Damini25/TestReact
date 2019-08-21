import React from 'react';
import './askComponent.css';
import _ from 'lodash';

class AskComponent extends React.Component {
    randomNumber(minimum, maximum) {
        return Math.round(Math.random() * (maximum - minimum) + minimum);
    }
    render() {
       // console.log('ask ordr',this.props.orders)
        const row = _.sortBy(this.props.orders, ['price','timestamp']).map((elem,i) => {
            const random = this.randomNumber(0, 1);
            return (
                <tr key={i} className={random === 1 ? 'backgroundBlue' : ''}>
                    <td>{elem['price']}</td>
                    <td>{elem['totalQty']}</td>
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