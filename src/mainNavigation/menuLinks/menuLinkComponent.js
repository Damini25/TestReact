import React from 'react';
import { slide as Menu } from "react-burger-menu";
class MenuLinks extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <Menu customBurgerIcon={
                <i className="fa fa-bars menu-btn" aria-hidden="true"></i>
            }>
               
                    <div className="menu-userimg-div">
                            <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="user-img" />
                            <div>Welcome! Damini</div>
                    </div>
              
                <a className="menu-item" href="#">
                    Home
                </a>

                <a className="menu-item" href="#">
                    Burgers
                </a>

                <a className="menu-item" href="#">
                    Pizzas
                </a>

                <a className="menu-item" href="#">
                    Desserts
                 </a>
            </Menu>
        )
    }
}
export default MenuLinks;