import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  './toastComponent.css';

export const MessageContainer = (position) => {
    return (
        <ToastContainer position={toast.POSITION.TOP_CENTER} 
        autoClose={2000} hideProgressBar={true}></ToastContainer>
    )
}

export const showToast = (type, msg) => {
    switch (type) {
        case 'success':
            return toast.success(msg,{
                    className: 'msgDiv',
                    // bodyClassName: "grow-font-size",
                    // progressClassName: 'fancy-progress-bar'
                });
        case 'error':
            return toast.error(msg);
        case 'info':
            return toast.info(msg);
        default:
            return toast.success(msg);
    }
}