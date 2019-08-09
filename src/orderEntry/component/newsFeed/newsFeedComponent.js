import React from 'react';
import './newsFeedComponent.css';

class NewsFeed extends React.Component {

    render() {
        return (<div className="news-feed-div">
            <h3>News Feed</h3>
            <div>
                <ul>
                    <li>1. Aurora Cannabis Stock  Falls to Key Support Levels </li>
                    <li>2. Kroger Losing Ground After Amazon Grocery Initiative </li>
                    <li>3. Chesapeake Extends Earnings Rally With Ascending Triangle Breakout</li>
                </ul>
                <a href="#">Click here for more news..</a>
            </div>
        </div>);
    }
}

export default NewsFeed;