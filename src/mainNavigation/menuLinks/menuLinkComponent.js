import React from 'react';
import { slide as Menu } from "react-burger-menu";
import { Link, NavLink } from 'react-router-dom';
class MenuLinks extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            menuOpen: false
        }
    }

    handleMenuStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    closeMenuOnNavClick() {
        console.log('nav click', this.state)
        this.setState((state) => ({
            menuOpen: !state.menuOpen
        }))
    }

    logout() {

    }

    render() {
        return (
            <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleMenuStateChange(state)}
                customBurgerIcon={
                    <i className="fa fa-bars menu-btn" aria-hidden="true"></i>
                } customCrossIcon={<i className="fa fa-angle-double-left" ></i>}>

                <div className="menu-userimg-div">
                    <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="user-img" />
                    <div>Welcome! Damini</div>
                </div>

                <NavLink activeClassName='is-active' >Home</NavLink>

                <NavLink activeClassName='is-active'>Portfolio</NavLink>

                {/* <NavLink activeClassName='is-active' to={{
                    pathname: this.props.match.url + "/manageGame"
                }} onClick={() => { this.closeMenuOnNavClick() }}>Games</NavLink> */}

                <NavLink activeClassName='is-active' to={{
                    pathname: this.props.match.url + "/execOrderList"
                }} onClick={() => { this.closeMenuOnNavClick() }}>Executed Orders</NavLink>

                <NavLink activeClassName='is-active' to={{
                    pathname: this.props.match.url + "/orderEntry"
                }} onClick={() => { this.closeMenuOnNavClick() }}>Trade</NavLink>

                <NavLink activeClassName='is-active' onClick={() => { this.logout() }}>Logout</NavLink>

            </Menu>
        )
    }
}
export default MenuLinks;