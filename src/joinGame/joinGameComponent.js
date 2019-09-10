import React from 'react';
import './joinGameComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../common/store/actions/actionIndex';

class ListTraderGames extends React.Component {

    componentDidMount() {
        this.props.onLoadGameData();
    }

    render() {
        let row = [];
        if (this.props.gameList && this.props.gameList.length) {
            row = this.props.gameList.map((elem, i) => {
                return (
                    <tr key={i} >
                        <td>{elem['gameCode']}</td>
                        <td>{elem['gameMode']}</td>
                        <td>{elem['startingBalance']}</td>
                        <td>{elem['startingVolume']}</td>
                        <td>{elem['bidAsk']}</td>
                        <td>{elem['interval']}</td>
                        <td>
                            <label onClick={() => this.openEditDialog}><i className="fa fa-edit" aria-hidden="true"></i></label>
                            <label><i className="fa fa-trash" aria-hidden="true"></i></label>
                        </td>
                    </tr>
                );
            })
        }

        return (
            <div className="list-trader-games-div">
                {/* <h3>games</h3> */}
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Game Name</th>
                                <th>Game Mode</th>
                                <th>Starting Cash</th>
                                <th>Volume</th>
                                <th>Buy/Sell</th>
                                <th>Interval</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
        onLoadGameData: () => {
            dispatch(actiontypes.LoadGameData())
        },
    }
}
const mapStateToProps = (state) => {
    // console.log('stateExecutedOrderList', state.gameManagementReducer['listGames']);
    return {
        gameList: state.gameManagementReducer['listGames']
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(ListTraderGames)