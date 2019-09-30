import React from 'react';
import {Switch } from 'react-router-dom';
import OrderEntry from '../../main/user/gameDashboard/gameDashboardMain/orderEntry';
import ManageGame from '../../main/admin/manageGame/manageGameComponent';
import JoinGame from '../../main/user/joinGame/joinGameComponent';
import PrivateRoute from '../../common/component/privateRouteComponent';
import DataUpload from '../../main/admin/uploadDataAdmin/dataUploadComponent';

const mainNavRoutes = <Switch>
    <PrivateRoute exact path="/mainNav" component={OrderEntry}></PrivateRoute>
    <PrivateRoute exact strict path="/mainNav/orderEntry" component={OrderEntry}></PrivateRoute>
    <PrivateRoute exact strict path="/mainNav/manageGame" component={ManageGame}></PrivateRoute>
    <PrivateRoute exact strict path="/mainNav/joinGame" component={JoinGame}></PrivateRoute>
    <PrivateRoute exact strict path="/mainNav/uploadDataAdmin" component={DataUpload}></PrivateRoute>
</Switch>

export default mainNavRoutes;