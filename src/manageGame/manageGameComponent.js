import React from 'react';
import './manageGameComponent.scss';

class ManageGame extends React.Component {

    render() {
        return (
            <div className="manage-game">
                <div className="sub-div">
                    <h3>Game Name & Basic Trading Rules</h3>
                    <p>*These settings cannot be changed once the game is created.</p>
                    <div>
                        <div className="label-input-div">
                            <label>Game Name</label>
                            <input placeholder="Enter name" />
                        </div>
                        <div className="label-input-div">
                            <label>Starting Cash</label>
                            <div className="cash-div">
                                <select>
                                    <option>
                                        $100,000
                                    </option>
                                </select>
                                <span>-</span>
                                <select>
                                    <option>
                                        USD$
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub-div">
                    <h3>Basic Game Rules</h3>
                    <p>Basic game rules can be modified.</p>
                    <div>
                        <div className="label-input-div">
                            <label>Start Date</label>
                            <input placeholder="Start Date" />
                        </div>
                        <div className="label-input-div">
                            <label>End Date</label>
                            <input placeholder="End Date" />
                        </div>
                        <div className="label-input-div">
                            <label >Allow Late Entry</label>
                            <div className="radiobtn-div">
                            <label htmlFor="yes">Yes</label>
                            <input name="lateEntry" value="yes" id="yes" type="radio" />
                            <label htmlFor="no">No</label>
                            <input name="lateEntry" value="no" id="no" type="radio" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ManageGame;