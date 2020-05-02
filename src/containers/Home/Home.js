import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomeScreen from './HomeScreen/HomeScreen.js';
import JoinGame from '../JoinGame/JoinGame';
import CreateGame from '../CreateGame/CreateGame';

import Testing from '../test/Testing';

import { BrowserRouter as Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import styles from './Home.module.css'

class Home extends Component {
  render() {
    return (
      <Container className={styles.CenterContent}>
        <Switch>
          <Route exact path="/" component={HomeScreen} />

          <Route exact path="/play" component={JoinGame} />

          <Route exact path="/create" component={CreateGame} />

          <Route exact path="/test" component={Testing} />
        </Switch>
      </Container>
    );
  }
}

export default Home;
