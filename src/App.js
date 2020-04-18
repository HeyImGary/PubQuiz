import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import JoinRoom from './JoinRoom';
import CreateGame from './CreateGame';
import CreateForm from './CreateForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <Container className="justify-content-md-center MainContainer">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/play">
                <JoinRoom />
              </Route>

              <Route exact path="/create">
                <CreateGame />
              </Route>

              <Route exact path="/create/form">
                <CreateForm />
              </Route>
            </Switch>
          </Router>
        </Container>
    );
  }
}

export default App;
