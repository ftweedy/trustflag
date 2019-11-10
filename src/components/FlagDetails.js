import React from "react"

import * as styles from "./FlagDetails.style"

const FlagDetails = props => {
    console.log(props)
    const {name, phoneNumber, location, licensePlateNumber} = props;
    
    return (
            <div className="row">
                <div className="col-sm-7 col-sm-offset-1" style={styles.CONTAINER}>
                    {name && 
                    <div><b>Name</b>: {name}</div>
                    }
                    {location && 
                    <div><b>Location</b>: {location}</div>
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