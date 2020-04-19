import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomeScreen from '../../component/HomeScreen/HomeScreen';
import JoinGame from '../JoinGame/JoinGame';
import CreateGame from '../CreateGame/CreateGame';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import styles from './Home.module.css'

class Home extends Component {
  render() {
    return (
        <Container className={styles.CenterContent}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HomeScreen />
              </Route>

              <Route exact path="/play">
                <JoinGame />
              </Route>

              <Route exact path="/create">
                <CreateGame />
              </Route>

            </Switch>
          </Router>
        </Container>
    );
  }
}

export default Home;
