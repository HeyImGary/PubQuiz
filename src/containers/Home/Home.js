import React, { Component, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//import HomeScreen from './HomeScreen/HomeScreen.js';
//import Join from '../JoinGame/Join';

// import CreateGame from '../CreateGame/CreateGame';

//import Testing from '../test/Testing';
import Spinner from '../../component/UI/Spinner/Spinner';

import { BrowserRouter as Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import styles from './Home.module.css';

const Play = React.lazy(() => import('../JoinGame/Play'));
const CreateGame = React.lazy(() => import('../CreateGame/CreateGame'));
const Join = React.lazy(() => import('../JoinGame/Join'));
const HomeScreen = React.lazy(() => import('./HomeScreen/HomeScreen.js'));

class Home extends Component {
  render() {
    return (
      <Container className={styles.CenterContent} fluid>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route path="/play" component={Play} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomeScreen} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/join" component={Join} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/create" component={CreateGame} />
          </Suspense>
          {/* //<Route exact path="/test" component={Testing} /> */}
        </Switch>
      </Container>
    );
  }
}

export default Home;
