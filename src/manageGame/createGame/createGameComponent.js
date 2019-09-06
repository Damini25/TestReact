import React from 'react';
import './createGameComponent.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateGame extends React.Component {
    state = {
        startDate: null,
        endDate: null
    };

    handleChange = (val, date) => {
        console.log('date,val', date, val)
        if (val === 'start') {
            this.setState({
                ...this.state,
                startDate: date
            });
        }
        if (val === 'end') {
            this.setState({
                ...this.state,
                endDate: date
            });
        }
    };

    render() {
        return (
            <div className="create-game">
                <div className="sub-div">
                    <h3>Game Name & Basic Trading Rules</h3>
                    <p>*These settings cannot be changed once the game is created.</p>
                    <div>
                        <div className="label-input-div">
                            <label>Game Name</label>
                            <input placeholder="Enter name" />
                        </div>
                        <div className="label-input-div">
                            <label>Game Mode</label>
                            <select>
                                <option>
                                    General
                                </option>
                                <option>
                                    Volume
                                </option>
                            </select>
                        </div>
                        <div className="label-input-div">
                            <label>Starting Cash</label>
                            <input placeholder="Enter starting cash" type="number" />
                        </div>
                    </div>
                </div>
                <div className="sub-div">
                    <h3>Basic Game Rules</h3>
                    <p>Basic game rules can be modified.</p>
                    <div>
                        <div className="label-input-div">
                            <label>Start Date</label>
                            <DatePicker selected={this.state.startDate}
                                placeholderText="Click to select a date"
                                onChange={(date) => this.handleChange('start', date)}
                            />
                        </div>
                        <div className="label-input-div">
                            <label>End Date</label>
                            <DatePicker selected={this.state.endDate}
                                placeholderText="Click to select a date"
                                onChange={(date) => this.handleChange('end', date)}
                            />
                            {/* <input placeholder="End Date" /> */}
                        </div>
                        {/* <div className="label-input-div">
                            <label >Allow Late Entry</label>
                            <div className="radiobtn-div">
                                <label htmlFor="yes">Yes</label>
                                <input name="lateEntry" value="yes" id="yes" type="radio" />
                                <label htmlFor="no">No</label>
                                <input name="lateEntry" value="no" id="no" type="radio" />
                            </div>
                        </div> */}
                    </div>
                    <div>
                        <button className="create-game-btn">Create Game</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateGame;