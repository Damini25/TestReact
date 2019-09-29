import React from 'react';
import './mainNavigationComponent.scss'
import {Switch } from 'react-router-dom';
import SideBar from './menuLinks/menuLinkComponent'
import OrderEntry from '../orderEntry/container/orderEntry';
import ManageGame from '../manageGame/manageGameComponent';
import JoinGame from '../joinGame/joinGameComponent';
import PrivateRoute from '../common/component/privateRouteComponent';
import NewsFeed from '../orderEntry/component/newsFeed/newsFeedComponent';
import DataUpload from '../uploadDataAdmin/dataUploadComponent';
import { clearLocalStorage,getLocalStorage } from '../common/localStorageService';
import { connect } from 'react-redux';
import * as actiontypes from '../common/store/actions/actionIndex';

class MainNavigation extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    state = {
        sidebarOpen: false
    };

    menuToggle(e) {
        e.stopPropagation();
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }

    logout() {
        clearLocalStorage();
        this.props.history.push("/login");
        // this.props.onLogout(data);
    }

    render() {
        return (
            <div className="outer-container">
                <div className="header-div">
                    <SideBar pageWrapId={"page-wrap"} {...this.props} logoutClicked={() => this.logout()} />
                    {/* <NewsFeed></NewsFeed> */}
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
                <Switch>
                    <PrivateRoute exact path="/mainNav" component={OrderEntry}></PrivateRoute>
                    <PrivateRoute exact strict path="/mainNav/orderEntry" component={OrderEntry}></PrivateRoute>
                    <PrivateRoute exact strict path="/mainNav/manageGame" component={ManageGame}></PrivateRoute>
                    <PrivateRoute exact strict path="/mainNav/joinGame" component={JoinGame}></PrivateRoute>
                    <PrivateRoute exact strict path="/mainNav/uploadDataAdmin" component={DataUpload}></PrivateRoute>
                </Switch>

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