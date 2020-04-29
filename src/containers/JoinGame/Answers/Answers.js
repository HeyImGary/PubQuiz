import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import styles from './Answers.module.css';

import AnswerButton from '../../../component/UI/AnswerButton/AnswerButton';

const answers = (props) => (
  <Row className={[styles.CenterContents, styles.MainRow]}>
    <Col xs={12} md={12}>
      <h1>{props.values.question}</h1>
    </Col>

    <Col xs={12} md={6}>
      <AnswerButton>{props.values.answers.answerOne}</AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton>{props.values.answers.answerTwo}</AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton>{props.values.answers.answerThree}</AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton>{props.values.answers.answerFour}</AnswerButton>
    </Col>

    <Col xs={12} md={12}>
      <br />
      {/* <Button onClick={() => props.nextQuestionHandler()}>Next Question</Button> */}
    </Col>
  </Row>
);

export default answers;
