import React from 'react';
import './DeleteAlertBox.css'
import CloseIcon from "@mui/icons-material/Close";

const DeleteAlertBox = ({handelDelete, closeDeleteAlertBox, type}) => {
    const handleBackgroundClick = (e) => {
        // If the clicked element is the container, close the modal
        if (e.target.className === 'deleteAlertBackground') {
            closeDeleteAlertBox();
        }
    };

    const handleDeleteAndClose = () => {
        handelDelete();           // Perform the delete action
        closeDeleteAlertBox();    // Close the alert box
    };
    return (
        <div className={'deleteAlertBackground'} onClick={handleBackgroundClick}>
            <div className={'deleteAlertContainer'}>
                <CloseIcon style={{position:'fixed',top: '0.5rem', right: '0.5rem', cursor:'pointer'}} onClick={closeDeleteAlertBox}/>
                {type === 'bag'?
                    <div style={{fontSize: '1.3rem', fontWeight: '700'}}>Are you sure you want to remove this item from your
                    bag?
                </div>:
                    <div style={{fontSize: '1.3rem', fontWeight: '700'}}>Are you sure you want to remove this item from your
                        save for later?
                    </div>
                }
                <button style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#c8102e',
                    color: 'white',
                    fontWeight: '700',
                    borderRadius: '0.25rem',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '1rem 0'
                }}
                        onClick={handleDeleteAndClose}>
                    YES, REMOVE THIS ITEM
                </button>
                <div className={'textButton'} onClick={closeDeleteAlertBox}>No, keep this item</div>
            </div>
        </div>
    );
};

export default DeleteAlertBox;