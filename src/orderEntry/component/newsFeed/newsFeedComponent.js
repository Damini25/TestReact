import React from 'react';
import './newsFeedComponent.scss';
import { connect } from 'react-redux';
import Ticker from 'react-ticker';
import * as actiontypes from '../../../common/store/actions/actionIndex';

class NewsFeed extends React.Component {

    componentDidMount() {
        // this.props.loadNewsList();
    }

    showNews(list) {
        this.props.showNewsSnackBar({
            msg: list.join('  ~  '),
            open: true,
            duration: 3000,
            direction: {
                vertical: 'top',
                horizontal: 'right',
            }
        })
    }

    render() {
        return (
            <div className="show-news-div">
                <label onClick={() => this.showNews(this.props.newsFeed)}>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </label>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadNewsList: () => {
            dispatch(actiontypes.LoadNewsList());
        },
        showNewsSnackBar: (data) => {
            dispatch(actiontypes.ShowSnackbar(data));
        }
    }
}
const mapStateToProps = (state) => {
    return {
        newsFeed: state.fetchDataReducer.newsFeed
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);