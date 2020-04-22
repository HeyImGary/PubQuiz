import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from '../../axios-add-questions';

import NavButton from '../../component/UI/NavButton/NavButton';
import styles from './CreateGame.module.css';
import Aux from '../../hoc/Aux';
import Test from '../Home/test';

class CreateGame extends Component {
  state = {
    emptyState: {},
    editState: {},
    questionNumber: 0,
    questions: [],
    isMultiQuestion: null,
    show: false,
    roomId: '',
    edit: true,
  };

  // deleteQuestion = (questionIndex) => {
  //   const questions = [...this.state.questions];
  //   questions.splice(questionIndex, 1);
  //   this.setState({ questions: questions });
  // };

  AddQuestion = (newQuestion) => {
    console.log(newQuestion);
    const newQuestionState = [...this.state.questions, newQuestion];
    this.setState({
      questions: newQuestionState,
      show: false,
      questionNumber: this.state.questionNumber + 1,
    });
  };

  printState = () => {
    console.log(this.state);
  };

  save = () => {
    const post = {
      questions: this.state.questions,
    };

    axios
      .post('/questions.json', post)
      .then((responce) => this.setState({ roomId: responce.data.name }))
      .catch((error) => console.log(error));
  };

  isMultiHandler = (bool) => {
    this.setState({
      show: true,
      isMultiQuestion: bool,
    });
  };

  render() {
    let questionForm = null;
    if (this.state.show) {
      questionForm = (
        <Aux>
          <Test
            isEditing={true}
            addQuestionHandler={(i) => this.AddQuestion(i)}
            questionNumber={this.state.questionNumber}
            isMulti={this.state.isMultiQuestion}
            click={this.save}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Col xs={12} md={{ span: 2, offset: 2 }} className={styles.BackBar}>
          <Link to="/">
            <h4>Back</h4>
          </Link>
        </Col>
        <h1>Add Question</h1>
        <h2>Room id: {this.state.roomId}</h2>
        {this.state.questions.map((question) => (
          <Aux>
            <Row className={[styles.CenterContents, styles.MainRow]}>
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
            </Row>
          </Aux>
        ))}
        <Button onClick={() => this.isMultiHandler(true)}>
          Multiple Choice Question
        </Button>

        {this.state.show ? [questionForm] : null}
        <br />
        {this.state.questions.length > 0 ? (
          <Button variant="success" onClick={() => this.save()}>
            Submit Questions
          </Button>
        ) : null}
      </Aux>
    );
  }
}

export default CreateGame;
