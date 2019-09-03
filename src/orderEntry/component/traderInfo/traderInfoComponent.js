import React from 'react';
import './traderInfoComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../../../common/store/actions/actionIndex';

class TraderInfo extends React.Component {

    render() {
        return (<div className="trader-info-div">
            <h3>Trader Info</h3>
            <div className="sub-div">
                <div>
                    <label>Trader Id </label>
                    <span>-</span>
                    <span>Trd-012</span>
                </div>
                <div>
                    <label>Name </label>
                    <span>-</span>
                    <span>{this.props.getTraderDetails['name']}</span>
                </div>
                <div>
                    <label>Game </label>
                    <span>-</span>
                    <span>Test001</span>
                </div>
                <div>
                    <label>Balance </label>
                    <span>-</span>
                    <span>$1,00,000</span>
                </div>
            </div>

        </div>);
    }
}

const mapStateToProps = (state) => {
    //console.log('name',state.fetchDataReducer.userDetails)
    return {
        getTraderDetails:state.fetchDataReducer.userDetails
    }
}
export default connect(mapStateToProps)(TraderInfo);