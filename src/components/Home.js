import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types"

class Home extends React.Component {
  render () {
    return (
        <div className="Home">
            <React.Fragment>
                <h1>Home Page</h1>
                <Link to="/add"><button>Add Flag</button></Link>
                <Link to="/search"><button>Search</button></Link>

                <Link to="/"><button>Logout</button></Link>
                {/* <Link to="/search"><button>Search Flags</button></Link>
                <Link to="/delete"><button>Add Flag</button></Link> */}
            </React.Fragment>
        </div>
    );
  }
}

export default Home
