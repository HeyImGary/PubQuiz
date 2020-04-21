import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './Answers.module.css';

import NavButton from '../UI/NavButton/NavButton';

import Aux from '../../hoc/Aux';

const answers = (props) => (
  <Aux>
    <Row className={[styles.CenterContent, styles.MainRow]}>
      <Col xs={12} md={12}>
        <h1>{props.values.question}</h1>
      </Col>
    </Row>
    <Row className="justify-content-md-center">
      <Col xs={12} md={3}>
        <NavButton>{props.values.answerOne}</NavButton>
      </Col>
      <Col xs={12} md={3}>
        <NavButton>{props.values.answerTwo}</NavButton>
      </Col>
    </Row>
    <Row className="justify-content-md-center">
      <Col xs={12} md={3}>
        <NavButton>{props.values.answerThree}</NavButton>
      </Col>
      <Col xs={12} md={3}>
        <NavButton>{props.values.answerFour}</NavButton>
      </Col>
    </Row>
    <br />
    <Row className={styles.CenterContent}>
      <Col xs={12} md={12}>
        <Button variant="success" onClick={props.nextQuestionHandler}>
          Next Question
        </Button>
      </Col>
    </Row>
  </Aux>
);

export default answers;
