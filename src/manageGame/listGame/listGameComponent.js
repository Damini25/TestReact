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
                            <label onClick={() => this.openEditDialog}>
                                <i className="fa fa-edit" ></i></label>
                            <label><i className="fa fa-trash" ></i></label>
                            <label onClick={() =>this.startGame(elem)}><i className="fa fa-arrow-right" ></i></label>
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
        onGameStart:(payload)=>{
            dispatch(actiontypes.GameStartedByAdmin(payload))
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