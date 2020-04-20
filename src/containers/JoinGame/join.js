import React from 'react';

import Aux from '../../hoc/Aux';
import styles from './JoinGame.module.css';

import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

const join = (props) => (
  <Aux>
    <Row>
      <Col xs={12} md={{ span: 2, offset: 2 }} className="Card">
        <Link to="/">
          <h4>Back</h4>
        </Link>
      </Col>
    </Row>
    <Row className={[styles.CenterContent, styles.MainRow]}>
      <Col xs={12} md={12}>
        <h1>Enter Room ID </h1>
      </Col>
    </Row>
    <Row className={styles.CenterContent}>
      <Col xs={12} md={3}>
        <Form.Control
          type="text"
          placeholder="RoomId"
          name="roomId"
          onChange={props.roomIdHandler}
        />
      </Col>
    </Row>
    <br />
    <Row className={styles.CenterContent}>
      <Col xs={12} md={3}>
        <Button variant="success" onClick={props.joinHandler}>
          Join
        </Button>
      </Col>
    </Row>
  </Aux>
);

export default join;
