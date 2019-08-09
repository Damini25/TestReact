import React from 'react';
import AppRoutes from './appRouting';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="switch-routes">
          <AppRoutes />
        </div>
      </div>
    );
  }
}
export default App;