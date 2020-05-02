import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import styles from './Answers.module.css';

import AnswerButton from '../../../component/UI/AnswerButton/AnswerButton';
import Aux from '../../../hoc/Aux'



const Answers = (props) => {
  let answer = ""

  function handleChange(e) {
    console.log(e.target.value)
    answer = e.target.value

  }

  return(

  <Row className={[styles.CenterContents, styles.MainRow]}>
    <Col xs={12} md={12}>
      <h1>{props.values.question}</h1>
    </Col>

    {props.values.questionType === "img" ? 
    (<Col xs={12} md={12}><img src={props.values.image} alt="appended picture of question"/> </Col>) : null}

    {props.values.answerType === "multi" ? (
    <Aux>
    <Col xs={12} md={6}>
      <AnswerButton disabled={props.disabled} clicked={() => answer = props.values.answers.answerOne}>{props.values.answers.answerOne}</AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton disabled={props.disabled} clicked={() => answer = props.values.answers.answerTwo}>{props.values.answers.answerTwo}</AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton disabled={props.disabled} clicked={() => answer = props.values.answers.answerThree}>{props.values.answers.answerThree}</AnswerButton>
    </Col>
    <Col xs={12} md={6}>
      <AnswerButton disabled={props.disabled} clicked={() => answer = props.values.answers.answerThree}>{props.values.answers.answerFour}</AnswerButton>
    </Col>
    </Aux>) : <Form.Control type="text" name="question" onChange={(e) => handleChange(e)}/> }

    <Col xs={12} md={12}>
      <br />
      <Button disabled={props.disabled} onClick={() => props.addAnswerHandler(answer)}>Next Question</Button>
    </Col>
  </Row>
  )
};

export default Answers;
