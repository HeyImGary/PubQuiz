import React, {useState} from 'react';

import styles from './QuestionList.module.css';

import Aux from '../../../hoc/Aux.js';
import { Button, Row, Col } from 'react-bootstrap';

const QuestionList = (props) => {

const [show, changeShow] = useState(true)

return(
  props.questions.map((question, index) => (
    <Aux>
      <Row className={styles.CenterContents}>
        <Col xs={12} md={12}>
          <h4>
            Question {index + 1}
          </h4>
          <button onClick={() => changeShow(!show)}>Hide</button>
          <p>{question.question}</p>
        </Col>
        {question.questionType === 'img' ? (
          <Col xs={12} md={12} className={styles.CenterContents}>
            <img src={question.image} className={styles.ImageHeight} />
          </Col>
        ) : null}
        {show ? (
        question.answerType === 'multi' ? (
          <Aux>
            <Col xs={12} md={6}>
              <p>A1:{question.answers.answerOne}</p>
            </Col>
            <Col xs={12} md={6}>
              <p>A2:{question.answers.answerTwo}</p>
            </Col>
            <Col xs={12} md={6}>
              <p>A3:{question.answers.answerThree}</p>
            </Col>
            <Col xs={12} md={6}>
              <p>A4:{question.answers.answerFour}</p>
            </Col>
          </Aux>
        ) : null): null}
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
  ))
  )
}
export default QuestionList;
