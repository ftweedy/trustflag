import React from 'react';

import * as styles from './OwnedFlag.style';


const OwnedFlag = ({flag}) => {

    return (
        <div style={styles.CONTAINER}>
            {flag.name && <div>Name: {flag.name}</div>}
            {flag.phoneNumber && <div>Phone number: {flag.phoneNumber}</div>}
            {flag.location && <div>Location: {flag.location}</div>}
            {flag.licensePlateNumber && <div>License plate number: {flag.licensePlateNumber}</div>}
        </div>
    );
};

export default OwnedFlag;
