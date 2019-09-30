import React from 'react';
import './mainNavigationComponent.scss'
import SideBar from './menuLinks/menuLinkComponent'
import { clearLocalStorage, getLocalStorage } from '../../common/utilities/localStorageService';
import { connect } from 'react-redux';
import * as actiontypes from '../../common/store/actions/actionIndex';
import mainNavRoutes from './mainNavRouting';

class MainNavigation extends React.Component {
    state = {
        sidebarOpen: false
    };

    /**
     * on side bar open/close
     */
    menuToggle(e) {
        e.stopPropagation();
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }
    
    /**
     * on logout click
     */
    logout() {
        clearLocalStorage();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="outer-container">
                <div className="header-div">
                    <SideBar pageWrapId={"page-wrap"} {...this.props} logoutClicked={() => this.logout()} />
                    <div className="main-title">INTERACTIVE TRADING GAME
                    </div>
                    <div className="username-div">Welcome!  {getLocalStorage('userName')}</div>
                    {
                        this.props.history.location.pathname.includes('/mainNav/orderEntry') ?
                            <div className="game-status-div"> {this.props.playbackOrdersFlow ?
                                (<div>Status :<span className="status-active">Active</span></div>) :
                                (<div>Status :<span className="status-end">Paused</span></div>)}
                            </div> :
                            ''
                    }
                </div>
                {mainNavRoutes}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playbackOrdersFlow: state.orderListReducer['playbackOrdersFlow']
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (data) => {
            dispatch(actiontypes.Logout(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);