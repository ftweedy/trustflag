import React from 'react';

import * as styles from './OwnedFlag.style';


const OwnedFlag = ({flag, onDelete}) => {
    
    const handleDelete = () => {
        onDelete(flag.id);
    }

    return (
        <tr>
            <td>{flag.name && <div>{flag.name}</div>}</td>
            <td>{flag.phoneNumber && <div>{flag.phoneNumber}</div>}</td>
            <td>{flag.location && <div>{flag.location}</div>}</td>
            <td>{flag.licensePlateNumber && <div>{flag.licensePlateNumber}</div>}</td>
            <td><div>{flag.expirationDate ? flag.expirationDate.split("T")[0] : 'Never'}</div></td>
            <button style={styles.DELETE_BUTTON} onClick={handleDelete}>Delete</button>
        </tr>         
    );
};

export default OwnedFlag;
