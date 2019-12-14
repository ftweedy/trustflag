import React from 'react';
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap-only-css/dist/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home}
              />
            </Switch>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
