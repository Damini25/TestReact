import React from 'react';
import './askComponent.css';

class AskComponent extends React.Component {
    render() {
        const row = this.props.orders.map((elem) => {
            return (
                <tr key={elem['orderId']}>
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