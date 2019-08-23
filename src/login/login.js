import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actiontypes from '../common/store/actions/actionIndex';

class Logincomponent extends React.Component {

    login(e) {
        /** API call */
        e.preventDefault();
        this.props.history.push("/orderEntry");
    }

    handleChange = (event) => {
        if (event.target.name === 'name') {
            this.props.onSettingUserDetails({ 'name': event.target.value });
        }
    }

    render() {
        return (
            <div className="parent-login-div">
                <h1>Account Login</h1>
                <hr></hr>
                <form onSubmit={(e) => { this.login(e) }}>
                    <div className="input-div">
                        <div >
                            <label htmlFor="name">Email Address</label>
                            <input type="text"  autoComplete="off" name="name" onChange={(e) => { this.handleChange(e) }} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" autoComplete="off" name="password" onChange={(e) => { this.handleChange(e) }} />
                        </div>
                        <div className="input-div-checkbox">
                            <input type="checkbox" id="remember_me_check" />
                            <label htmlFor="remember_me_check">Remember Me</label>
                        </div>
                        <button className="signin-btn" type="submit">Sign in</button>
                        <div className="link-div">
                            <Link to="/signup">Create new account</Link> <span>|</span>
                            <Link to="/forgotPassword">Forgot your password?</Link>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSettingUserDetails: (data) => {
            dispatch(actiontypes.SetUserDetails(data))
        }
    }
}
export default connect(null, mapDispatchToProps)(Logincomponent);