import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import styles from './Answers.module.css';

import AnswerButton from './AnswerButton/AnswerButton';

const answers = (props) => (
  <Row className={[styles.CenterContents, styles.MainRow]}>
    <Col xs={12} md={12}>
      <h1>{props.values.question}</h1>
    </Col>

    <Col xs={12} md={6}>
      <AnswerButton click={() => props.selectAnswer('answerOne')}>
        {props.values.answers.answerOne}
      </AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton click={() => props.selectAnswer('answerTwo')}>
        {props.values.answers.answerTwo}
      </AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton click={() => props.selectAnswer('answerThree')}>
        {props.values.answers.answerThree}
      </AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton click={() => props.selectAnswer('answerFour')}>
        {props.values.answers.answerFour}
      </AnswerButton>
    </Col>
    <br />
    <Col xs={12} md={12}>
      <Button onClick={() => props.nextQuestionHandler()}>Next Question</Button>
    </Col>
  </Row>
);

export default answers;