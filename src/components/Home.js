import React from "react"
import { Link } from "react-router-dom";
import OwnedFlag from "./OwnedFlag";
import * as styles from './Home.style'
import logo from '../logo.png';
import Search from "./Search";

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        activeFlags: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/flags/user/1")
      .then(response => {
        return response.json();
      })
      .then(activeFlags => {
        this.setState({activeFlags});
      })
  }

  render () {
    const {activeFlags} = this.state;
    return (
        <div className="Home">
            <React.Fragment>
                <div className="row" style={styles.HEADER}>
                    <div className="col-sm-2">
                        <img alt="logo" src={logo} style={styles.LOGO}/>
                    </div>
                    <div className="col-sm-2 col-sm-offset-8">
                        <Link to="/"><button>Logout</button></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div style={styles.FLAGS_HEADER}>Active Flags</div>
                        {activeFlags && activeFlags.map(flag => <OwnedFlag flag={flag}/> )}
                    </div>
                    <div className="col-sm-8">
                        <Search/>
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
  }
}

export default Home
