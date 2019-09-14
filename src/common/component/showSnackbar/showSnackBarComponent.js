import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import * as actiontypes from '../../store/actions/actionIndex';
import './showSnackBarComponent.scss';

class ShowSnackbar extends React.Component{
    closeSnackBar = () => {
        this.props.onCloseSnackBar();
    }

    render() {
        return (
            <div>
                <Snackbar
                
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.props.snackBarInfo['open']}
                    autoHideDuration={this.props.snackBarInfo['duration']}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        classes:{
                            root:'msg-span'
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
        snackBarInfo: state.requestStatusReducer['snackBarInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCloseSnackBar: () => {
            dispatch(actiontypes.CloseSnackbar());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSnackbar)