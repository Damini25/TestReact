import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class SimpleSnackbar extends React.Component() {
    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.openSnackBar}
                    autoHideDuration={this.props.duration}
                    onClose={this.props.closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">this.props.snackBarMsg</span>}
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={this.props.closeSnackBar} >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default SimpleSnackbar