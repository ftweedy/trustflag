import React from "react"
import { Link } from "react-router-dom";
// import PropTypes from "prop-types"

class Add extends React.Component {
  render () {
    return (
        <div className="Search">
            <React.Fragment>
                <h1>Add a new flag</h1>
                <label for="add"><b>Enter information for flag</b></label>
                <input type="text" placeholder="Enter Target Entity" name="add" required />
                <Link to="/home"><button>Home Page</button></Link>
                <Link to="/home"><button>Add Flag</button></Link>
            </React.Fragment>
        </div>
    );
  }
}

export default Add