import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLocalStorage } from '../utilities/localStorageService';

const PrivateRouteComponent = ({ component: Component, ...rest }) => {
    return <Route {...rest} exact strict render={
        (props) => {
            return getLocalStorage('traderId') ? <Component {...props} /> : <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }
                }
            ></Redirect>
        }
    }></Route >

}
export default PrivateRouteComponent;