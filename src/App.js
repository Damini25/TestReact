import React from 'react';
import appRoutes from './appRouting';
import './App.scss';
import ShowLoader from './common/component/showLoader/loaderComponent';
import SnackBar from './common/component/showSnackbar/showSnackBarComponent';

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="switch-routes">
          {/* <MessageContainer></MessageContainer> */}
          {/* <ShowLoader></ShowLoader> */}
          <SnackBar></SnackBar>
          {/* {<img src={process.env.PUBLIC_URL +'/assets/images/loaderGif.gif'} alt="loading..." />} */}
         {appRoutes}
        </div>
      </div>
    );
  }
}
export default App;