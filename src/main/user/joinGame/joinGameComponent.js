import React from 'react';
import './joinGameComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../../../common/store/actions/actionIndex';
import { getLocalStorage, clearLocalStorageKey } from '../../../common/utilities/localStorageService';

class ListTraderGames extends React.Component {

    /**
     * Clear game session id and game id if any.
     * Load active games list
     */
    componentDidMount() {
        clearLocalStorageKey('gameSessionId');
        clearLocalStorageKey('gameId');
        this.props.onLoadTraderGameData({ 'userId': parseInt(getLocalStorage('traderId')) });
    }

    /**
     * if no game session exist then navigate to join game component
     */
    componentDidUpdate(prevProps) {
        if (getLocalStorage('gameSessionId') && this.props.gameSessionId !== prevProps.gameSessionId) {
            this.props.history.push("/mainNav/orderEntry");
        } else if (!getLocalStorage('gameSessionId') && this.props.gameSessionId !== prevProps.gameSessionId) {
            this.props.history.push("/mainNav/joinGame");
        }
    }

    /**
     * dispatch action to join a game
     */
    joinGame(elem) {
        const payload = {
            gameId: elem['gameId'],
            traderId: parseInt(getLocalStorage('traderId'))
        }
        this.props.onJoiningGame(payload);

    }

    render() {
        let row = [];
        let noActiveGames = false;
        if (this.props.gameList && this.props.gameList.length) {
            row = this.props.gameList.map((elem, i) => {
                return (
                    <tr key={i} >
                        <td>{elem['gameDetails']['gameCode']}</td>
                        <td>{elem['gameDetails']['gameMode']}</td>
                        <td>{elem['gameDetails']['startingBalance']}</td>
                        <td>{elem['gameDetails']['startingVolume'] ? elem['gameDetails']['startingVolume'] : '-'}</td>
                        <td>{elem['gameDetails']['bidAsk'] ? elem['gameDetails']['bidAsk'] : '-'}</td>
                        <td>{elem['gameDetails']['gameInterval']}</td>
                        <td>
                            {elem['hasUserJoined'] ?
                                <button className="join-game-btn primary-color button"
                                    onClick={() => this.joinGame(elem['gameDetails'])}>Enter</button> :
                                <button className="join-game-btn primary-color button"
                                    onClick={() => this.joinGame(elem['gameDetails'])}>Join</button>}
                        </td>
                    </tr>
                );
            })
        } else {
            noActiveGames = true;
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
                            {noActiveGames ? <tr className="no-game-active"><td>Sorry, No game is active !</td></tr> : <tr><td></td></tr>}
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
    return {
        gameList: state.traderGameManagementReducer['listTraderGames'],
        gameSessionId: state.traderGameManagementReducer['gameSessionId']
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(ListTraderGames)