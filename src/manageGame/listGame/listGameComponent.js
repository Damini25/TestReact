import React from 'react';
import './listGameComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../../common/store/actions/actionIndex';
import EditGame from '../editGame/editGameComponent';

// import * as actiontypes from '../common/store/actions/actionIndex';
// import {getLocalStorage} from '../common/localStorageService';

class ListGames extends React.Component {
    state = {
        editModal: false
    }

    openEditDialog() {
        this.setState({
            editModal: true
        })
    }

    componentDidMount() {
        this.props.onLoadGameData();
    }

    startGame(elem) {
        this.props.onGameStart(elem);
    }

    endGame(elem){
        const payload={
            gameId:elem['gameId']
        }
        this.props.onGameEnd(payload);
    }

    deleteGame(elem) {
       // this.props.onDeleteGame(elem);
    }
    render() {
        let row = [];
        if (this.props.gameList && this.props.gameList.length) {
            row = this.props.gameList.map((elem, i) => {
                console.log('ee',elem['isGameActive'])
                return (
                    <tr key={i} >
                        <td>{elem['gameCode']}</td>
                        <td>{elem['gameMode']}</td>
                        <td>{elem['startingBalance']}</td>
                        <td>{elem['startingVolume']?elem['startingVolume']:'-'}</td>
                        <td>{elem['bidAsk']? elem['bidAsk'] :'-'}</td>
                        <td>{elem['gameInterval']}</td>
                        <td>{elem['isGameActive'] ? 'Active' :'Inactive'}</td>
                        <td>
                            <label onClick={() => this.openEditDialog}>
                                <i className="fa fa-edit" ></i></label>
                            <label onClick={() => this.deleteGame(elem)} title="Delete Game"><i className="fa fa-trash" ></i></label>
                            {
                                elem['isGameActive'] !== true ? <label title="Start Game" onClick={() => this.startGame(elem)}><i className="fa fa-arrow-right start-game-icon" ></i></label> :
                                <label title="End Game" onClick={() => this.endGame(elem)}><i className="fa fa-stop end-game-icon"></i></label>
                            }

                        </td>
                    </tr>
                );
            })
        }

        return (
            <div className="list-games-div">
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
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>
                    </table>
                </div>
                <EditGame open={this.state.editModal}></EditGame>
            </div>
        );
    }
}


const mapdispatchToProps = (dispatch) => {
    return {
        onLoadGameData: () => {
            dispatch(actiontypes.LoadGameData())
        },
        onGameStart: (payload) => {
            dispatch(actiontypes.GameStartedByAdmin(payload))
        },
        onGameEnd: (payload) => {
            dispatch(actiontypes.GameStoppedByAdmin(payload))
        },
        onDeleteGame:(payload) => {
            dispatch(actiontypes.GameDeletedByAdmin(payload))
        }
    }
}
const mapStateToProps = (state) => {
    // console.log('stateExecutedOrderList', state.gameManagementReducer['listGames']);
    return {
        gameList: state.gameManagementReducer['listGames']
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(ListGames)