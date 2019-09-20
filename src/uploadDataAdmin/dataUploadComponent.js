import React from 'react';
import './dataUploadComponent.scss';
import { connect } from 'react-redux';
import * as actiontypes from '../common/store/actions/actionIndex';

class DataUpload extends React.Component {
    state = {
        newsFile: '',
        ordersFile: ''
    }
    fileRefNews = React.createRef();
    fileRefData = React.createRef();

    uploadFile(type) {
        const payload = {};
        console.log('fil', this.fileRefNews.files[0])
        if (type === 'newsData') {
            this.props.onUploadData({
                type: 'newsData',
                payload: { file: this.fileRefNews.files[0] }
            })
            this.setState({
                newsFile: ''
            })
        } else {
            this.props.onUploadData({
                type: 'gameData',
                payload: { file: this.fileRefData.files[0] }
            })
            this.setState({
                ordersFile: ''
            })
        }
    }

    handleChange(event, type) {
        if (type === 'newsData') {
            this.setState({
                newsFile: event.target.files[0]
            })
        } else {
            this.setState({
                ordersFile: event.target.files[0]
            })
        }
    }

    handleChange = (event) => {
        this.props.onUpdateCreateGameFormValue({ [event.target.name]:  event.target.files[0] })
    }

    render() {
        return (
            <div className="main-upload-data-div">

                <div className="file-input-div">
                    <h3>
                        Upload News File
                    </h3>
                    <div >
                        {/* <label title="Choose file">Upload file</label> */}
                        <input
                            title="Upload news file (in csv format)"
                            ref={(input) => { this.fileRefNews = input; }}
                            name="newsFile" type="file" 
                        />
                        <button className="upload-div-btn" onClick={() => this.uploadFile('newsData')}>Upload</button>
                    </div>
                </div>

                <div className="file-input-div">
                    <h3>
                        Upload Data file
                    </h3>
                    <div >
                        {/* <label title="Choose file">Upload file</label> */}
                        <input
                            title="Upload Data"
                            ref={(input) => { this.fileRefData = input; }} 
                            name="ordersFile" type="file" 
                        />
                        <button className="upload-div-btn" onClick={() => this.uploadFile('gameData')}>Upload</button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadData: (data) => {
            dispatch(actiontypes.UploadGameBasedDataFile(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataUpload);