import React from 'react';
//import Sidebar from "react-sidebar";
import './mainNavigationComponent.scss'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SideBar from './menuLinks/menuLinkComponent'
import OrderEntry from '../orderEntry/container/orderEntry';
import ManageGame from '../manageGame/manageGameComponent';
import ExecOrderList from '../executedOrders/executedOrdersComponent';
// import CreateGame from '../manageGame/createGame/createGameComponent';
import JoinGame from '../joinGame/joinGameComponent';
import PrivateRoute from '../common/component/privateRouteComponent';

class MainNavigation extends React.Component {

    componentDidMount(){
     //   console.log('urlddcomponentDidMount', this.props.match.url)
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

    render() {
      //  console.log('url', this.props.match.url)
        return (
            // <BrowserRouter>
                <div className="outer-container">
                    <div className="header-div" >
                        <SideBar pageWrapId={"page-wrap"} {...this.props} />
                    </div>

                    <Switch>
                        <PrivateRoute exact  path="/mainNav" component={OrderEntry}></PrivateRoute>
                        <PrivateRoute exact strict path="/mainNav/orderEntry" component={OrderEntry}></PrivateRoute>
                        <PrivateRoute exact strict path="/mainNav/manageGame" component={ManageGame}></PrivateRoute>
                        <PrivateRoute exact strict path="/mainNav/joinGame" component={JoinGame}></PrivateRoute>
                        {/* <Route path="/mainNav" exact component={OrderEntry} ></Route>
                        <Route path="/mainNav/orderEntry" component={OrderEntry} ></Route>
                        <Route path="/mainNav/manageGame" exact strict component={ManageGame} ></Route>
                        <Route path="/mainNav/createGame" exact strict component={CreateGame} ></Route>
                        <Route path="/mainNav/execOrderList" component={ExecOrderList} ></Route>
                        <Route path="/mainNav/joinGame" component={JoinGame} ></Route> */}
                    </Switch>

                </div>
            //  </BrowserRouter> 
        )
    }
}
export default MainNavigation