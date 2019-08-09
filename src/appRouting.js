import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './login/login';
import Notfound from './common/component/notFound/notFoundComponent';
import OrderEntry from './orderEntry/container/orderEntry';

const AppRoutes = () => {
    return <BrowserRouter>
        <Switch>
            <Route path="/" exact strict component={Login} ></Route>
            <Route path="/login" exact component={Login} ></Route>
            <Route path="/orderEntry" exact component={OrderEntry} ></Route>
            <Route component={Notfound}></Route>
        </Switch>
    </BrowserRouter>
}

export default AppRoutes;