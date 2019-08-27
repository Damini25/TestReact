import React from 'react';
//import Sidebar from "react-sidebar";
import './mainNavigationComponent.css'
import SideBar from './menuLinks/menuLinkComponent'

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
        return (
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
                <div id="page-wrap">
                    <h1>Cool Restaurant 🍔🍕</h1>
                    <h2>Check out our offerings in the sidebar!</h2>
                </div>
            </div>
        )
    }
}
export default MainNavigation