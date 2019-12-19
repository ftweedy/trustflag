import React from "react"
import * as styles from "./FlagSearch.style"

const FlagSearch = (props) => {
    const {onChange, onSearch} = props;
    return (
        <div>
            <div className="row">
                <br />
                <div className="col-sm-4 col-sm-offset-4">
                    <div>Search for persons of interest</div>
                    <i>Include at least one field</i>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-5 col-sm-offset-1">
                    <input onChange={onChange} type="text" placeholder="Enter name" name="name" />
                    <input onChange={onChange} type="text" placeholder="Enter location" name="location" />
                    <input onChange={onChange} type="text" placeholder="Enter license plate" name="licensePlateNumber" />
                    <input onChange={onChange} type="text" placeholder="Enter phone number" name="phoneNumber" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-1 col-sm-offset-1">
                    <button style={styles.SEARCH_BUTTON} onClick={onSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default FlagSearch