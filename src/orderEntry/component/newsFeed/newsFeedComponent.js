import React from 'react';
import './newsFeedComponent.css';

class NewsFeed extends React.Component {

    render() {
        return (<div className="news-feed-div">
            <h3>News Feed</h3>
            <div>
                <ul>
                    <li>1. An increase in wind energy and a record low PV tariff have reduced electricity prices </li>
                    <li>2. The European Energy Exchange (EEX) will expand its product range ... peak load products with weekly, monthly, quarterly </li>
                    <li>3. Global warming will hit solar panel performance</li>
                </ul>
                <a href="#">Click here for more news..</a>
            </div>
        </div>);
    }
}

export default NewsFeed;