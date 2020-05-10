import React, { useState } from 'react';
import { Row, Col, Button, Form, Toast } from 'react-bootstrap';

import styles from './Answers.module.css';

import AnswerButton from '../../../component/UI/AnswerButton/AnswerButton';
import Aux from '../../../hoc/Aux';

const Answers = (props) => {
  const [answer, updateAnswer] = useState('');
  const [disabled, isDisabled] = useState(false);

  return (
    <Row className={[styles.CenterContents, styles.MainRow]}>
      <Col xs={12} md={12}>
        <h1>{props.values.question}</h1>
      </Col>

      {props.values.questionType === 'img' ? (
        <Col xs={12} md={12}>
          <img
            src={props.values.image}
            className={styles.Image}
            alt="appended picture of question"
          />{' '}
        </Col>
      ) : null}
      {props.values.answerType === 'multi' ? (
        <Aux>
          {Object.keys(props.values.answers).map((answer) => (
            <Col xs={12} md={6}>
              <AnswerButton
                disabled={disabled}
                clicked={() => updateAnswer(props.values.answers[answer])}
              >
                {props.values.answers[answer]}
              </AnswerButton>
            </Col>
          ))}
        </Aux>
      ) : (
        <Col xs={12} md={6}>
          <br />
          <Form.Control
            type="text"
            name="question"
            value={answer}
            disabled={disabled}
            onChange={(e) => updateAnswer(e.target.value)}
          />
        </Col>
      )}

      <Col xs={12} md={12}>
        <br />
        <Button
          disabled={answer === '' || disabled ? true : false}
          onClick={
            (() => props.addAnswerHandler(answer), () => isDisabled(true))
          }
        >
          {disabled ? 'Answer Submitted' : 'submit answer'}
        </Button>
      </Col>
    </Row>
  );
};

export default Answers;
