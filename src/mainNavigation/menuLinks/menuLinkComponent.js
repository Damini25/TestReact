import React from 'react';
import { slide as Menu } from "react-burger-menu";
import { Link, NavLink } from 'react-router-dom';
import { clearLocalStorage } from '../../common/localStorageService';

class MenuLinks extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            menuOpen: false,
            showGameMenu: false
        }
    }

    handleMenuStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    showNestedMenu(val) {
        if (val === 'game') {
            this.setState({
                ...this.state, showGameMenu: !this.state.showGameMenu
            })
        }
    }

    closeMenuOnNavClick() {
        console.log('nav click', this.state)
        this.setState((state) => ({
            menuOpen: !state.menuOpen
        }))
    }

    logout() {
        clearLocalStorage();
        this.props.history.push("/login");
    }

    render() {
        return (
            <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleMenuStateChange(state)}
                customBurgerIcon={
                    <i className="fa fa-bars font-i-btn" aria-hidden="true"></i>
                } customCrossIcon={<i className="fa fa-angle-double-left" ></i>}>

                <div className="menu-userimg-div">
                    <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="user-img" />
                    <div>Welcome! Damini</div>
                </div>

                <NavLink activeClassName='is-active' >Home</NavLink>

                <NavLink activeClassName='is-active'>Portfolio</NavLink>

                <div>
                    <label onClick={() => this.showNestedMenu('game')}>Game
                     {this.state.showGameMenu ? <i className="fa fa-caret-up font-i-nestedbtn"></i> :
                            <i className="fa fa-caret-down font-i-nestedbtn"></i>
                        }
                    </label>


                    {this.state.showGameMenu ? <div className="nested-menu-item-div">
                        <NavLink className="bm-item" activeClassName='is-active' to={{
                            pathname: this.props.match.url + "/manageGame"
                        }}>Manage Game
                    </NavLink>
                        <NavLink className="bm-item" activeClassName='is-active' to={{
                            pathname: this.props.match.url + "/joinGame"
                        }} onClick={() => { this.closeMenuOnNavClick() }}>Join Game</NavLink>
                    </div> : ''}
                </div>



                {/* <NavLink activeClassName='is-active' to={{
                    pathname: this.props.match.url + "/execOrderList"
                }} onClick={() => { this.closeMenuOnNavClick() }}>Executed Orders</NavLink> */}

                <NavLink activeClassName='is-active' to={{
                    pathname: this.props.match.url + "/orderEntry"
                }} onClick={() => { this.closeMenuOnNavClick() }}>Trade</NavLink>

                <NavLink activeClassName='is-active' onClick={() => { this.logout() }}>Logout</NavLink>

            </Menu>
        )
    }
}
export default MenuLinks;