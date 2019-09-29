import React from 'react';
import appRoutes from './appRouting';
import './App.scss';
import SnackBar from './common/component/showSnackbar/showSnackBarComponent';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="switch-routes">
          <SnackBar></SnackBar>
          {this.props.showLoader ? <div className="full-page-loader" >
            <img src={process.env.PUBLIC_URL + '/assets/images/loader6.gif'} alt=""></img>
          </div>:''}
          {appRoutes}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showLoader: state.requestStatusReducer['isFetching'],
  }
}
export default connect(mapStateToProps)(App);