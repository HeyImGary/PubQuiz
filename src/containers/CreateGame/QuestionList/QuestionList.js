import React from 'react'

import styles from './QuestionList.module.css';

import Aux from '../../../hoc/Aux'
import { Button, Row, Col } from 'react-bootstrap';

const questionList = (props) => (
    
    props.questions.map((question) => (
    <Aux>
        <Row className={[styles.CenterContents]}>
        <Col xs={12} md={12}>
            <h4>Question: {question.question}</h4>
        </Col>

        {question.answers !== null ? (
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
            <Col xs={12} md={12}>
                <hr />
            </Col>
            </Aux>
        ) : null}
        <hr />
        </Row>

        
    </Aux>
    )
))

export default questionList