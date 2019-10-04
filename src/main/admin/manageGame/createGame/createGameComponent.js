import React from 'react';
import './createGameComponent.scss';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import * as actiontypes from '../../../../common/store/actions/actionIndex';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateGame extends React.Component {
    fileRef = React.createRef();

    handleDateChange = (name, date) => {
        this.props.onUpdateCreateGameFormValue({ [name]: date })
    };

    /**
     * Fetch Date List for which data is uploaded
     */
    componentDidMount() {
        this.props.onFetchGameBasedDates();
    }

    /**
     * Set value in state on input change
     */
    handleChange = (event) => {
        const value = event.target.name === 'file' ? event.target.files[0] : event.target.value;
        this.props.onUpdateCreateGameFormValue({ [event.target.name]: value })
    }

    /**
     * Dispatch action to post create gme form data to api
     */
    executeOrder = (event) => {
        event.preventDefault();
        this.postCreateGameData(this.props.formValues);
    }

    postCreateGameData(formvalues) {
        const payload = { ...formvalues }
        payload['isGameActive'] = false;
        this.props.onPostCreateGameData(formvalues);
    }

    render() {
        const form = <form onSubmit={(e) => { this.executeOrder(e) }}>
            <p className="note-p">Note: Before creating a game please upload Orders data. </p>
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
                                ""
                        }
                        <div className="label-input-div">
                            <label>Starting Cash</label>
                            <input name="startingCash"
                                autoComplete="off"
                                value={this.props.formValues['startingCash']}
                                placeholder="Enter starting cash" type="number"
                                onChange={(e) => { this.handleChange(e) }} />
                        </div>
                    </div>
                </div>
                <div className="sub-div">
                    <h3>Basic Game Rules</h3>
                    <p>Basic game rules can be modified.</p>
                    <div>
                        <div className="label-input-div">
                            <label title="Set playback time">Playback time</label>
                            <select name="playbackDate"
                                value={this.props.formValues['playbackDate']}
                                onChange={(e) => { this.handleChange(e) }}>
                                <option disabled value="">Select playback time</option>
                                {this.props.gameBasedDates && this.props.gameBasedDates.length ?
                                    this.props.gameBasedDates.map((elem) => {
                                        return (
                                            <option key={elem} value={elem}>
                                                {elem}
                                            </option>
                                        )
                                    }) : ''}
                            </select>
                            <DatePicker
                                placeholderText="Start time"
                                selected={this.props.formValues['playbackStartTime']}
                                onChange={date => this.handleDateChange('playbackStartTime', date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                            <DatePicker
                                placeholderText="End time"
                                selected={this.props.formValues['playbackEndTime']}
                                onChange={date => this.handleDateChange('playbackEndTime', date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>

                        <div className="label-input-div game-interval-div">
                            <label title="Set game interval (in minutes)">Set game interval</label>
                            <input name="gameInterval"
                                value={this.props.formValues['gameInterval']}
                                onChange={(e) => { this.handleChange(e) }}
                                placeholder="Set game interval" type="number" />
                        </div>

                    </div>
                    <div>
                        <div className="label-input-div playback-freq-div">
                            <label title="Set playback frequency (in seconds)">Playback frequency</label>
                            <select name="playbackFrequency"
                                value={this.props.formValues['playbackFrequency']}
                                onChange={(e) => { this.handleChange(e) }}>
                                <option disabled value="">Select playback frequency</option>
                                <option value={1500}> 0.5 </option>
                                <option value={1000}> 1 </option>
                                <option value={2000}> 2 </option>
                                <option value={3000}> 3</option>
                            </select>
                        </div>
                        <button className="create-game-btn  primary-color button"
                            disabled={
                                !this.props.formValues['playbackDate'] ||
                                !this.props.formValues['gameInterval'] ||
                                !this.props.formValues['playbackStartTime'] ||
                                !this.props.formValues['playbackEndTime'] ||
                                !this.props.formValues['startingCash'] ||
                                !this.props.formValues['gameMode'] ||
                                !this.props.formValues['gameName'] 
                            }
                            type="submit" >{this.props.gameActionBtnLabelc ? 'Create' : 'Create/Update'}</button>
                    </div>
                </div>
            </div>
        </form>
        return (
            <div>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        formValues: state.gameManagementReducer.createGameFormValue,
        gameCreatedSuccessfully: state.gameManagementReducer.gameCreatedSucess,
        isFetchingData: state.requestStatusReducer.isFetching,
        gameActionBtnLabel: state.gameManagementReducer.createGameBtnLabel,
        gameBasedDates: state.gameManagementReducer.gameBasedDates
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
        onFetchGameBasedDates: () => {
            dispatch(actiontypes.FetchGameBasedDates())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);