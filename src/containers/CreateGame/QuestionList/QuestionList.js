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
            {show ? ' ▾' : ' ▸'}
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
              {Object.keys(props.question.answers).map((answer, index) => (
                <Col xs={6} md={6}>
                  <p>
                    A{index + 1}: {props.question.answers[answer]}
                  </p>
                </Col>
              ))}
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
