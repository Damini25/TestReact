import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import * as actiontypes from '../../store/actions/actionIndex';
import './showSnackBarComponent.scss';


class ShowSnackbar extends React.Component {
 
      processQueue = () => {
        if (this.props.newsList.length > 0) {
                this.props.showNewsSnackBar({msg:this.props.newsList.shift(),duration:8000})
        }
      };

    closeSnackBar = () => {
        this.props.onCloseSnackBar();
    }

    componentDidUpdate(prevProps) {
        if (prevProps['newsList'] !== this.props['newsList'] && this.props.playbackOrdersFlow) {
            this.processQueue();
        }
    }

     handleExited = () => {
        this.processQueue();
      };

    render() {
        return (
            <div>
                <Snackbar
                key={this.props.snackBarInfo['msg']}
                    onExited={this.handleExited}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.props.snackBarInfo['open']}
                    autoHideDuration={this.props.snackBarInfo['duration']}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        classes: {
                            root: 'msg-span'
                        },
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id" >{this.props.snackBarInfo['msg']}</span>}
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={this.closeSnackBar} >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        snackBarInfo: state.requestStatusReducer['snackBarInfo'],
        newsList: state.fetchDataReducer.newsFeed,
        playbackOrdersFlow: state.orderListReducer['playbackOrdersFlow']
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCloseSnackBar: () => {
            dispatch(actiontypes.CloseSnackbar());
        },
        showNewsSnackBar: (data) => {
            dispatch(actiontypes.ShowSnackbar(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSnackbar)