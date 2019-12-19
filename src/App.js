import React from 'react';
import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import LogIncident from './components/LogIncident'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Dashboard} />
               <Route path="/log" component={LogIncident}
              />
            </Switch>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
