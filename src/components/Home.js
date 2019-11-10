import React from "react"
import { Link } from "react-router-dom";
// import PropTypes from "prop-types"

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        display: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/users/all")
      .then(response => {
        return response.json();
      })
      .then(json => {
        let firstUser = json[0];
        this.setState({display: json, firstUser});
        console.log(this.state.dislay)
      })
      .catch(e => {
        console.log("Error", e);
      });
  }

  render () {
    let { display, firstUser } = this.state;
    return (
        <div className="Home">
            <React.Fragment>
                <h1>Home Page</h1>
                <Link to="/add"><button>Add Flag</button></Link>
                <Link to="/search"><button>Search</button></Link>
                <Link to="/"><button>Logout</button></Link>
                <h1>{firstUser && firstUser.email}</h1>
                {/* <Link to="/search"><button>Search Flags</button></Link>
                <Link to="/delete"><button>Add Flag</button></Link> */}
            </React.Fragment>
        </div>
    );
  }
}

export default Home
