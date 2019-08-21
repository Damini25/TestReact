import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

class Logincomponent extends React.Component {

    login(e) {
        /** API call */
        this.props.history.push("/orderEntry");
    }

    render() {
        return (
            <div className="parent-login-div">
                <h1>Account Login</h1>
                <hr></hr>
                <div className="input-div">
                    <div >
                        <label>Email Address</label>
                        <input />
                    </div>
                    <div>
                        <label>Password</label>
                        <input />
                    </div>
                    <div className="input-div-checkbox">
                        <input type="checkbox" id="remember_me_check" />
                        <label htmlFor="remember_me_check">Remember Me</label>
                    </div>
                    <button className="signin-btn" onClick={(e) => { this.login(e) }}>Sign in</button>
                    <div className="link-div">
                        <Link to="/signup">Create new account</Link> <span>|</span>
                        <Link to="/forgotPassword">Forgot your password?</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Logincomponent;