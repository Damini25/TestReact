import React from 'react';
import './dataUploadComponent.scss';
import { connect } from 'react-redux';


class DataUpload extends React.Component {
    //  fileRef = React.createRef();
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
                            ref={(input) => { this.fileRef = input; }}
                            name="file" type="file" onChange={(e) => this.handleChange(e)}
                        />
                        <button className="upload-div-btn">Upload</button>
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
                            ref={(input) => { this.fileRef = input; }}
                            name="file" type="file" onChange={(e) => this.handleChange(e)}
                        />
                        <button className="upload-div-btn">Upload</button>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //  console.log('isFetchingData', state.showLoaderReducer.isFetching);
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataUpload);