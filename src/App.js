import React from 'react';
import AppRoutes from './appRouting';
import './App.css';
import {MessageContainer} from './common/component/toastMessages/toastcomponent'

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="switch-routes">
          <MessageContainer></MessageContainer>
          <AppRoutes />
        </div>
      </div>
    );
  }
}
export default App;