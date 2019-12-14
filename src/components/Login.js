import React from "react"
import { Link } from "react-router-dom";
import * as styles from "./Login.style"


class Login extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <form class="col-sm-6">
            hello world
            </form>
            <form class="col-sm-6">
              <div class="form-group">
                <h1>Login</h1>
                <label for="uname" style={{textAlign: 'left'}}><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />
                    
                <Link to="/home"><button>Submit</button></Link>
              </div>
            </form>   
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login
