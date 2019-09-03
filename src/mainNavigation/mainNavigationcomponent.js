import React from 'react';
//import Sidebar from "react-sidebar";
import './mainNavigationComponent.scss'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SideBar from './menuLinks/menuLinkComponent'
import OrderEntry from '../orderEntry/container/orderEntry';
import ManageGame from '../manageGame/manageGameComponent';
import ExecOrderList from '../executedOrders/executedOrdersComponent';

class MainNavigation extends React.Component {

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
        console.log('url', this.props.match.url)
        return (
            <BrowserRouter>
                <div className="outer-container">
                    <div className="header-div" >
                        <SideBar pageWrapId={"page-wrap"} {...this.props} />
                    </div>

                    <Switch>
                        {/* <Route path="/mainNav" component={OrderEntry} ></Route> */}
                        <Route path="/mainNav/orderEntry" component={OrderEntry} ></Route>
                        <Route path="/mainNav/manageGame" component={ManageGame} ></Route>
                        <Route path="/mainNav/execOrderList" component={ExecOrderList} ></Route>
                    </Switch>

                </div>
            </BrowserRouter>
        )
    }
}
export default MainNavigation