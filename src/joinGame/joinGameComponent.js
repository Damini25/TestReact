import React from 'react';
import './joinGameComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../common/store/actions/actionIndex';
import { getLocalStorage } from '../common/localStorageService';

class ListTraderGames extends React.Component {

    componentDidMount() {
        this.props.onLoadTraderGameData({ 'userId': parseInt(getLocalStorage('traderId')) });
    }

    componentDidUpdate(prevProps) {
       // console.log('joingame',getLocalStorage('gameSessionId'), prevProps, this.props)
        if (getLocalStorage('gameSessionId') && this.props.gameSessionId !== prevProps.gameSessionId) {
            this.props.history.push("/mainNav/orderEntry");
        }
    }

    joinGame(elem) {
        const payload = {
            gameId: elem['gameId'],
            traderId: parseInt(getLocalStorage('traderId'))
        }
        this.props.onJoiningGame(payload);

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
                        <td>{elem['startingVolume'] ? elem['startingVolume'] : '-'}</td>
                        <td>{elem['bidAsk'] ? elem['bidAsk'] : '-'}</td>
                        <td>{elem['gameInterval']}</td>
                        <td>
                            <button className="join-game-btn" onClick={() => this.joinGame(elem)}>Join</button>
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
        onLoadTraderGameData: (param) => {
            dispatch(actiontypes.LoadTraderGameList(param))
        },
        onJoiningGame: (payload) => {
            dispatch(actiontypes.JoinGame(payload))
        }
    }
}
const mapStateToProps = (state) => {
    console.log('stateExecutedOrderList', state.traderGameManagementReducer['listTraderGames']);
    return {
        gameList: state.traderGameManagementReducer['listTraderGames'],
        gameSessionId: state.traderGameManagementReducer['gameSessionId']
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(ListTraderGames)