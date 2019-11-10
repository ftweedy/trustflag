import React from 'react';
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap-only-css/dist/bootstrap.min.css';

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
