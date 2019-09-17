import React from 'react';
import './newsFeedComponent.scss';
import { connect } from 'react-redux';
import Ticker from 'react-ticker';
import * as actiontypes from '../../../common/store/actions/actionIndex';

class NewsFeed extends React.Component {

    componentDidMount() {
        this.props.loadNewsList();
    }


    render() {
       /* const news = this.props.newsList && this.props.newsList.length ?
            this.props.newsList.map((elem, index) => {
                //  this.props.showNewsSnackBar({msg:elem,open:true,duration:3000})
            }
            ) : '';*/
        return (
            <div>
                <Ticker>{
                    () => (
                        this.props.newsList && this.props.newsList.length ?
                            <p className="news-list">{this.props.newsList.join('  ~  ')}</p> :
                            <h5 className="news-else-placeholder">Not forun</h5>)
                }</Ticker>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadNewsList: () => {
            dispatch(actiontypes.LoadNewsList());
        }
    }
}
const mapStateToProps = (state) => {
    return {
        newsList: state.fetchDataReducer.newsFeed,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);