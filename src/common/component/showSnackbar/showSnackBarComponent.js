import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import * as actiontypes from '../../store/actions/actionIndex';
import './showSnackBarComponent.scss';
import SnackbarContent from '@material-ui/core/SnackbarContent';



class ShowSnackbar extends React.Component {

    closeSnackBar = () => {
        this.props.onCloseSnackBar();
    }

    componentDidUpdate(prevProps) {
        if (prevProps['latestNewsList'] !== this.props['latestNewsList']) {
            this.processQueue();
        }
    }

    /**
     * Process news list queue to show news snackbar
     */
    processQueue = () => {
        if (this.props.latestNewsList.length > 0) {
            this.props.showNewsSnackBar({
                msg: this.props.latestNewsList.shift(), duration: 10000, direction: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            })
        }
    };

    handleExited = () => {
        this.processQueue();
    };

    render() {
        return (
            <div>
                <Snackbar className='Snackbar'
                    key={this.props.snackBarInfo['msg']}
                    onExited={this.handleExited}
                    anchorOrigin={{ ...this.props.snackBarInfo['direction'] }}
                    open={this.props.snackBarInfo['open']}
                    autoHideDuration={this.props.snackBarInfo['duration']}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        classes: {
                            root: 'msg-span'
                        },
                        'aria-describedby': 'message-id',
                    }}
                >
                    <SnackbarContent
                        message={<span id="message-id" >{this.props.snackBarInfo['msg']}</span>}
                    >
                    </SnackbarContent>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        snackBarInfo: state.requestStatusReducer['snackBarInfo'],
        latestNewsList: state.orderListReducer['ordersToShow']['latestNewsFeed'],
        playbackOrdersFlow: state.orderListReducer['ordersToShow']['playbackOrdersFlow']
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