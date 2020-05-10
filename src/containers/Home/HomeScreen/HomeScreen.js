import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './HomeScreen.module.css';

import NavButton from '../../../component/UI/NavButton/NavButton';
import Aux from '../../../hoc/Aux';

const homeScreen = () => (
  <Aux>
    <Row className={styles.MainRow}>
      <Col>
        <h1>Pub Quiz Time</h1>
      </Col>
    </Row>
    <Row className={styles.CenterContent}>
      <Col xs={12} md={3}>
        <Link to="/join">
          <NavButton>Play Game</NavButton>
        </Link>
      </Col>

      <Col xs={12} md={{ span: 3, offset: 2 }}>
        <Link to="/create">
          <NavButton>Create Game</NavButton>
        </Link>
      </Col>
    </Row>
  </Aux>
);

export default homeScreen;
