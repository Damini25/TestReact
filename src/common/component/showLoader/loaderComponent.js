import React from 'react';
import './loaderComponent.scss';
 const ShowLoader = () => {
    return (
        <div className="loader-div">
            <img src={process.env.PUBLIC_URL +'/assets/images/ajax-loader.gif'} alt="loading..." />
        </div>
    );
}

export default ShowLoader