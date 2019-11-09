import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types"

class Search extends React.Component {
  render () {
    return (
        <div className="Search">
            <React.Fragment>
                <h1>Search</h1>
                <label for="search"><b>Enter information for search</b></label>
                <input type="text" placeholder="Enter Search Entity" name="search" required />
                <Link to="/home"><button>Home Page</button></Link>
                <Link to="/home"><button>Add Flag</button></Link>
            </React.Fragment>
        </div>
    );
  }
}

export default Search