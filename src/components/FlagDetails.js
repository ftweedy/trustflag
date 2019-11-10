import React from "react"

import * as styles from "./FlagDetails.style"

const FlagDetails = props => {
    const {name, phoneNumber, locationStr, licensePlateNumber} = props;
    
    return (
            <div className="row">
                <div className="col-sm-5 col-sm-offset-1" style={styles.CONTAINER}>
                    {name && 
                    <div style={styles.FIELD}><b>Name</b>: {name}</div>
                    }
                    {locationStr && 
                    <div><b>Location</b>: {locationStr}</div>
                    }
                    {licensePlateNumber && 
                    <div><b>License plate number</b>: {licensePlateNumber}</div>
                    }
                    {phoneNumber && 
                    <div><b>Phone number</b>: {phoneNumber}</div>
                    }
                </div>
        </div>
    );
}

export default FlagDetails