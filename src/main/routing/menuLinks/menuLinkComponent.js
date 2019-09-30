import React from 'react';
import { slide as Menu } from "react-burger-menu";
import { NavLink } from 'react-router-dom';
import { getLocalStorage } from '../../../common/utilities/localStorageService';

class MenuLinks extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            menuOpen: false,
            showGameMenu: false
        }
    }

    /**
     * handle menu open/close
     */
    handleMenuStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    /**
     * Function call on menu click with nested options
     */
    showNestedMenu(val) {
        if (val === 'game') {
            this.setState({
                ...this.state, showGameMenu: !this.state.showGameMenu
            })
        }
    }

    /**
     * Close menu
     */
    closeMenuOnNavClick() {
        this.setState((state) => ({
            menuOpen: !state.menuOpen
        }))
    }

    render() {
        return (
            <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleMenuStateChange(state)}
                customBurgerIcon={
                    <i className="fa fa-bars font-i-btn" aria-hidden="true"></i>
                } customCrossIcon={<i className="fa fa-angle-double-left" ></i>}>

                <div className="menu-userimg-div">
                    <div>Interactive Trading Game</div>
                </div>
                {
                    parseInt(getLocalStorage('userTypeId')) === 0 ?
                        /**
                         * Admin menu
                         */
                        <div>
                            <div>
                                <NavLink className="bm-item" activeClassName='is-active' to={{
                                    pathname: this.props.match.url + "/uploadDataAdmin"
                                }}>Data Upload
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="bm-item" activeClassName='is-active' to={{
                                    pathname: this.props.match.url + "/manageGame"
                                }}>Manage Game
                                </NavLink>
                            </div>

                            <div>
                                <NavLink to={{
                                    pathname: ""
                                }}
                                    className="bm-item" activeClassName='is-active' onClick={this.props.logoutClicked}>Logout</NavLink>
                            </div>
                        </div> :
                        /**
                         * Member menu
                         */
                        <div>
                            <div>
                                <NavLink className="bm-item" activeClassName='is-active' to={{
                                    pathname: this.props.match.url + "/joinGame"
                                }} onClick={() => { this.closeMenuOnNavClick() }}>Join Game
                                        </NavLink>
                            </div>
                            <div>
                                <NavLink to={{
                                    pathname: ""
                                }}
                                    className="bm-item" activeClassName='is-active' onClick={this.props.logoutClicked}>Logout</NavLink>
                            </div>
                        </div>
                }
            </Menu>
        )
    }
}
export default MenuLinks;