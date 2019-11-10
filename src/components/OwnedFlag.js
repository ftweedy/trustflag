import React from 'react';

import * as styles from './OwnedFlag.style';


const OwnedFlag = ({flag, onDelete}) => {
    
    const handleDelete = () => {
        onDelete(flag.id);
    }

    return (
        <div style={styles.CONTAINER}>
            <div className="row">
                <div className="col-sm-8">
                    {flag.name && <div>Name: {flag.name}</div>}
                    {flag.phoneNumber && <div>Phone number: {flag.phoneNumber}</div>}
                    {flag.location && <div>Location: {flag.location}</div>}
                    {flag.licensePlateNumber && <div>License plate number: {flag.licensePlateNumber}</div>}
                    <div>Expires: {flag.expires ? flag.expires.split("T")[0] : 'Never'}</div>
                </div>
                <div className="col-sm-2">
                    <button style={styles.DELETE_BUTTON} onClick={handleDelete}>Delete</button>
                </div>
            </div>
            
        </div>
    );
};

export default OwnedFlag;
