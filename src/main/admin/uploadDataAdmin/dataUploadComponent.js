import React from 'react';
import './dataUploadComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../../../common/store/actions/actionIndex';
import { getLocalStorage } from '../../../common/utilities/localStorageService';

class DataUpload extends React.Component {
    fileRefNews = React.createRef();
    fileRefData = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            gameId: "",
            newsFile: "",
            ordersFile: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Function call to get  games list 
     */
    componentDidMount() {
        this.props.onLoadGameData({ 'userId': parseInt(getLocalStorage('traderId')) });
    }

    /**
     *  clear state when on response from API
     */
    componentDidUpdate(prevProps) {
        if (prevProps.apiResolved !== this.props.apiResolved && this.props.apiResolved) {
            this.setState({
                ...this.state,
                gameId: '',
                newsFile: '',
                ordersFile: ''
            })
            this.fileRefNews.value = null;
            this.fileRefData.value = null;
        }
    }

    /**
     * Dispatch file upload action
     */
    uploadFile(type) {
        if (type === 'newsFile') {
            this.props.onUploadData({
                type: 'newsData',
                payload: { gameId: this.state.gameId, file: this.fileRefNews.files[0] }
            })

        } else {
            this.props.onUploadData({
                type: 'gameData',
                payload: { file: this.fileRefData.files[0] }
            })
        }
    }

    /**
     * 
     */
    handleChange(event) {
        const val = event.target.name === 'gameId' ? event.target.value : event.target.files[0]
        this.setState({
            ...this.state,
            [event.target.name]: val
        })
    }

    render() {
        return (
            <div className="main-upload-data-div">

                <div className="file-input-div">
                    <h3>
                        Upload News File
                    </h3>
                    <div className="game-id-div">
                        <label title="Select Game (for which you want to upload news)">Select Game</label>
                        <select name="gameId"
                            value={this.state.gameId}
                            onChange={(e) => { this.handleChange(e) }}>
                            <option disabled value="">Select Game</option>
                            {this.props.gameList && this.props.gameList.length ?
                                this.props.gameList.map((elem, i) => {
                                    return (
                                        <option key={i} value={elem['gameId']}>
                                            {elem['gameCode']}
                                        </option>
                                    )
                                }) : ''}
                        </select>
                    </div>
                    <div >
                        <input
                            title="Upload news file (in csv format)"
                            ref={(input) => { this.fileRefNews = input; }}
                            onChange={this.handleChange}
                            name="newsFile" type="file"
                        />
                        <button className={!this.state.newsFile || !this.state.gameId ? 'upload-div-btn button' : 'upload-div-btn primary-color button'}
                            disabled={!this.state.newsFile || !this.state.gameId}
                            onClick={() => this.uploadFile('newsFile')}>Upload</button>
                    </div>
                </div>

                <div className="file-input-div">
                    <h3>
                        Upload Data file
                    </h3>
                    <div>
                        <input type="file"
                            name="ordersFile"
                            onChange={this.handleChange}
                            ref={(input) => { this.fileRefData = input; }}
                        />
                        <button className={!this.state.ordersFile ? 'upload-div-btn button' : 'upload-div-btn primary-color button'}
                            disabled={!this.state.ordersFile}
                            onClick={() => this.uploadFile('ordersFile')}>Upload</button>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ordersFile: state.gameManagementReducer.ordersFile,
        newsFile: state.gameManagementReducer.newsFile,
        gameList: state.gameManagementReducer['listGames'],
        apiResolved: state.requestStatusReducer['isFetching'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadData: (data) => {
            dispatch(actiontypes.UploadGameBasedDataFile(data))
        },
        onLoadGameData: (param) => {
            dispatch(actiontypes.LoadGameData(param))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataUpload);