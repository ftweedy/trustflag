import React from "react"
import { Link } from "react-router-dom";
// import PropTypes from "prop-types"

class Login extends React.Component {
  render () {
    return (
        <div className="Login">
            <React.Fragment>
                <h1>Login</h1>
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />
                    
                <Link to="/home"><button>Login</button></Link>
            </React.Fragment>
        </div>
    );
  }
}

export default Login
