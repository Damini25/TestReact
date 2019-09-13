import React from 'react';
import './createGameComponent.scss';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import * as actiontypes from '../../common/store/actions/actionIndex';

class CreateGame extends React.Component {
    fileRef = React.createRef();
    handleChange = (event) => {
        // console.log('value', event.target.name, event.target.value);
        const value = event.target.name === 'file' ? event.target.files[0] : event.target.value;
        this.props.onUpdateCreateGameFormValue({ [event.target.name]: value })
    }

    executeOrder = (event) => {
        event.preventDefault();
        this.postCreateGameData(this.props.formValues);
    }

    componentDidUpdate(prev) {
        if (this.props.gameCreatedSuccessfully) {
            this.fileRef.value = null;
        }
    }
    postCreateGameData(formvalues) {
        console.log('vv', this.fileRef)
        const payload = { ...formvalues }
        payload['isGameActive'] = false;
        this.props.onPostCreateGameData(formvalues);
    }

    render() {
        return (
            <form onSubmit={(e) => { this.executeOrder(e) }}>
                <div className="create-game">
                    <div className="sub-div">
                        <h3>Game Name & Basic Trading Rules</h3>
                        <p>*These settings cannot be changed once the game is created.</p>
                        <div>
                            <div className="label-input-div">
                                <label>Game Name</label>
                                <input name="gameName" autoComplete="off" value={this.props.formValues['gameName']}
                                    placeholder="Enter name" onChange={(e) => { this.handleChange(e) }} />
                            </div>

                            <div className="label-input-div">
                                <label>Game Mode</label>
                                <select name="gameMode"
                                    value={this.props.formValues['gameMode']}
                                    onChange={(e) => { this.handleChange(e) }}>

                                    <option disabled value="">Select game mode </option>
                                    <option value='general'>
                                        General
                                </option>
                                    <option value='volume'>
                                        Volume
                                </option>
                                </select>
                            </div>

                            {
                                this.props.formValues['gameMode'] === 'volume' ?
                                    <div>
                                        <div className="label-input-div">
                                            <label>Volume</label>
                                            <input autoComplete="off" name="volume" value={this.props.formValues['volume']}
                                                placeholder="Enter volume" type="number"
                                                onChange={(e) => { this.handleChange(e) }} />
                                        </div>
                                        <div className="label-input-div">
                                            <label>Transaction Type</label>
                                            <div className="transaction-radio-div">
                                                <input
                                                    type="radio"
                                                    name="transaction"
                                                    value="Bid"
                                                    id="bid"
                                                    checked={this.props.formValues['transaction'] === 'Bid'}
                                                    onChange={(e) => { this.handleChange(e) }}
                                                />
                                                <label htmlFor="bid">Buy</label>
                                            </div>
                                            <div className="transaction-radio-div">
                                                <input
                                                    type="radio"
                                                    name="transaction"
                                                    value="Ask"
                                                    id="ask"
                                                    checked={this.props.formValues['transaction'] === 'Ask'}
                                                    onChange={(e) => { this.handleChange(e) }}
                                                />
                                                <label htmlFor="ask">Sell</label>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="label-input-div">
                                        <label>Starting Cash</label>
                                        <input name="startingCash"
                                            autoComplete="off"
                                            value={this.props.formValues['startingCash']}
                                            placeholder="Enter starting cash" type="number"
                                            onChange={(e) => { this.handleChange(e) }} />
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="sub-div">
                        <h3>Basic Game Rules</h3>
                        <p>Basic game rules can be modified.</p>
                        <div>
                            <div className="label-input-div">
                                <label title="Set game interval (in minutes)">Set game interval</label>
                                <input name="gameInterval"
                                    value={this.props.formValues['gameInterval']}
                                    onChange={(e) => { this.handleChange(e) }}
                                    placeholder="Set game interval" type="number" />
                            </div>
                            <div className="label-input-div">
                                <label title="Choose file">Upload file</label>
                                <input
                                    ref={(input) => { this.fileRef = input; }}
                                    name="file" type="file" onChange={(e) => this.handleChange(e)}
                                    placeholder="Set game interval" />
                            </div>
                        </div>
                        <div>
                            <button className="create-game-btn" type="submit" >Create Game</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
  //  console.log('isFetchingData', state.showLoaderReducer.isFetching);
    return {
        formValues: state.gameManagementReducer.createGameFormValue,
        gameCreatedSuccessfully: state.gameManagementReducer.gameCreatedSucess,
        isFetchingData: state.requestStatusReducer.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCreateGameFormValue: (obj) => {
            dispatch(actiontypes.UpdateCreateGameFormValues(obj))
        },
        onPostCreateGameData: (obj) => {
            dispatch(actiontypes.PostCreateGameData(obj))
        },
        onResetCreateGameFormValues: () => {
            //dispatch(actiontypes.ResetGameFormValues())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);