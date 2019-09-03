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
      //  console.log('newsList', this.props.newsList, this.props.newsList.join(' '));
        const news1 = <h5>hello</h5>
        const news = this.props.newsList && this.props.newsList.length ?
            this.props.newsList.map((elem, index) => {
                return (<h5>{elem}</h5>);
            }) : <h5></h5>;
        return (
            <div>
                {/* <span>Todays News:</span> */}
                <Ticker>{
                    () => (
                        this.props.newsList && this.props.newsList.length ?
                            <p className="news-list">{this.props.newsList.join(' ')}</p> :
                            <h5 className="news-else-placeholder">Not forun</h5>)
                }</Ticker>
            </div>
        );




        // return (<div className="news-feed-div">
        //     <h3>News Feed</h3>
        //     <div>
        //         <ul>
        //             <li>1. An increase in wind energy and a record low PV tariff have reduced electricity prices </li>
        //             <li className="tempColor">2. The European Energy Exchange (EEX) will expand its product range ... peak load products with weekly, monthly, quarterly </li>
        //             <li>3. Global warming will hit solar panel performance</li>
        //         </ul>
        //         <a href="#">Click here for more news..</a>
        //     </div>
        // </div>);

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
    //  console.log('chart',state.chartReducer)
    return {
        newsList: state.fetchDataReducer.newsFeed
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);