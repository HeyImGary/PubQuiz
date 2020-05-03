import React, { useState, useEffect } from 'react';

import styles from './QuestionList.module.css';

import Aux from '../../../hoc/Aux.js';
import { Button, Row, Col } from 'react-bootstrap';

const QuestionList = (props) => {
  const [show, toggleShow] = useState(true);
  let hidden = styles.CenterContents;

  useEffect(() => {
    hidden = styles.Hidden;
  }, [show]);

  return (
    <Aux>
      <Row className={styles.CenterContents}>
        <Col xs={12} md={12}>
          <h4 onClick={() => toggleShow(!show)}>
            {props.questionNumber + 1}: {props.question.question}
            {show ? '▾' : '▸'}
          </h4>
        </Col>
      </Row>
      <Row className={styles.CenterContents}>
        {props.question.questionType === 'img' && show ? (
          <Col xs={12} md={12} className={styles.CenterContents}>
            <img src={props.question.image} className={styles.ImageHeight} />
          </Col>
        ) : null}
        {show ? (
          props.question.answerType === 'multi' ? (
            <Aux>
              <Col xs={12} md={6}>
                <p>A1:{props.question.answers.answerOne}</p>
              </Col>
              <Col xs={12} md={6}>
                <p>A2:{props.question.answers.answerTwo}</p>
              </Col>
              <Col xs={12} md={6}>
                <p>A3:{props.question.answers.answerThree}</p>
              </Col>
              <Col xs={12} md={6}>
                <p>A4:{props.question.answers.answerFour}</p>
              </Col>
            </Aux>
          ) : null
        ) : null}

        <Col xs={12} md={6}>
          <p className={styles.Red} onClick={props.deleteQuestionHandler}>
            Delete
          </p>
        </Col>
        <Col xs={12} md={6}>
          <p className={styles.Green} onClick={props.deleteQuestionHandler}>
            Edit
          </p>
        </Col>
      </Row>
    </Aux>
  );
};
export default QuestionList;
