import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

class EditGameComponent extends React.Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    render() {
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={() => this.handleClose}
                >
                    <div>
                        <h2 id="simple-modal-title">Text in a modal</h2>
                        <p id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default EditGameComponent;

