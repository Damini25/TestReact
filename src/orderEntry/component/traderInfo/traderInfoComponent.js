import React from 'react';
import './traderInfoComponent.css';

class TraderInfo extends React.Component {

    render() {
        return (<div className="trader-info-div">
            <h3>Trader Info</h3>
            <div>
                <label>Trader Id </label><span> - Trd-012</span>
            </div>
            <div>
                <label>Name </label><span> - Leo</span>
            </div>
            <div>
                <label>Game </label><span> - Test001</span>
            </div>
            <div>
                <label>Balance </label><span> - $1,00,000</span>
            </div>
        </div>);
    }
}

export default TraderInfo;