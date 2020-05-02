import React from 'react';

import styles from './QuestionList.module.css';

import Aux from '../../../hoc/Aux.js';
import { Button, Row, Col } from 'react-bootstrap';

const questionList = (props) =>
  props.questions.map((question, index) => (
    <Aux>
      <Row className={styles.CenterContents}>
        <Col xs={12} md={12}>
          <h4>
            Question {index + 1}: {question.question}
          </h4>
        </Col>
        {question.questionType === 'img' ? (
          <Col xs={12} md={12} className={styles.CenterContents}>
            <img src={question.image} className={styles.ImageHeight} />
          </Col>
        ) : null}

        {question.answerType === 'multi' ? (
          <Aux>
            <Col xs={12} md={6}>
              <p>Answer 1:{question.answers.answerOne}</p>
            </Col>
            <Col xs={12} md={6}>
              <p>Answer 2:{question.answers.answerTwo}</p>
            </Col>
            <Col xs={12} md={6}>
              <p>Answer 2:{question.answers.answerThree}</p>
            </Col>
            <Col xs={12} md={6}>
              <p>Answer 2:{question.answers.answerFour}</p>
            </Col>
          </Aux>
        ) : null}
        <Col xs={12} md={12}>
          <Button
            variant="danger"
            className={styles.CenterContents}
            onClick={props.deleteQuestionHandler}
          >
            X
          </Button>
          <Col xs={12} md={12}>
            <hr />
          </Col>
        </Col>
      </Row>
    </Aux>
  ));

export default questionList;
