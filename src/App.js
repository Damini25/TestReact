import React from 'react';
import AppRoutes from './appRouting';
import './App.scss';
import {MessageContainer} from './common/component/toastMessages/toastcomponent'
import SnackBar from './common/component/showSnackbar/showSnackBarComponent';

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="switch-routes">
          {/* <MessageContainer></MessageContainer> */}
          <SnackBar></SnackBar>
          <AppRoutes />
        </div>
      </div>
    );
  }
}
export default App;