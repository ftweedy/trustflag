import React from 'react';
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/Add'
import Search from './components/Search'
// import Search from './components/Search'
// import Delete from './components/Delete'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/add" component={Add} />
              <Route path="/search" component={Search} />
              {/* <Route path="/delete" component={Delete} /> */}
            </Switch>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
