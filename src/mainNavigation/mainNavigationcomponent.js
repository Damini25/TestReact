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
            <div className="outer-container">
                <div className="header-div" >
                <SideBar  pageWrapId={"page-wrap"} />
                </div>
            </div>
        )
    }
}
export default MainNavigation