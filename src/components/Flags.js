import React from "react"
import { Link } from "react-router-dom";
// import PropTypes from "prop-types"

class Flags extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        flags: [],
    }
  }

//   componentDidMount() {
//     let url = new URL("http://localhost:8080/flags/all")
//     fetch(url)
//     .then(response => {
//       return response.json();
//     })
//     .then(json => {
//       let { flags } = this.state
//       json.map((flag, index) => {
//         if (flag.id === 1){
//           flags.push(flag)
//         }
//       })
//       this.setState({flags: flags});
//     })
//     .catch(e => {
//       console.log("Error", e);
//     });
//   }

  render () {
    let { flags } = this.state
    var result = "<table border=1>";
    return (
        <div className="Search">
          <React.Fragment>
            <h1>Your flags</h1>

            <Link to="/home"><button>Home Page</button></Link>
          </React.Fragment>
        </div>
    );
  }
}

export default Flags