import React from "react"
import * as styles from "./Search.style"

const Search = (props) => {
    const {handleChange, handleSearch} = props;
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
                    <input onChange={handleChange} type="text" placeholder="Enter Name" name="name" />
                    <input onChange={handleChange} type="text" placeholder="Enter location" name="location" />
                    <input onChange={handleChange} type="text" placeholder="Enter license plate" name="license_plate" />
                    <input onChange={handleChange} type="text" placeholder="Enter phone number" name="phone" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-1 col-sm-offset-1">
                    <button style={styles.SEARCH_BUTTON} onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default Search