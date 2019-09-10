import React from 'react';
import './listGameComponent.scss';
import { connect } from 'react-redux';
// import * as actiontypes from '../common/store/actions/actionIndex';
// import {getLocalStorage} from '../common/localStorageService';

class ListGames extends React.Component {

    render() {
        return (
            <div className="list-games-div">
                {/* <h3>games</h3> */}
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Game Name</th>
                                <th>Game Mode</th>
                                <th>Price</th>
                                <th>Interval</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>158</td>
                                <td>11:07:02</td>
                                <td>NCG</td>
                                <td>23.55</td>
                                <td>BID</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
    }
}
const mapStateToProps = (state) => {
    // console.log('stateExecutedOrderList', state.fetchDataReducer['bookedOrders'],
    // state.fetchDataReducer['executedOrders']);
    return {
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(ListGames)