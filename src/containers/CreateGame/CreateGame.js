import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from '../../axios-add-questions';

import NavButton from '../../component/UI/NavButton/NavButton';
import styles from './CreateGame.module.css';

import QuestionList from './QuestionList/QuestionList';
import Aux from '../../hoc/Aux';
import Test from '../Home/test';

class CreateGame extends Component {
  state = {
    emptyState: {
      question: '',
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      answerFour: '',
    },
    editState: {},
    questionNumber: 0,
    questions: [],
    isMultiQuestion: null,
    show: false,
    roomId: '',
    edit: true,
  };

  deleteQuestion = (questionIndex) => {
    const questions = [...this.state.questions];
    questions.splice(questionIndex, 1);
    this.setState({ questions: questions });
  };

  AddQuestion = (newQuestion) => {
    console.log(newQuestion);
    const newQuestionState = [...this.state.questions, newQuestion];
    this.setState({
      questions: newQuestionState,
      show: false,
      questionNumber: this.state.questionNumber + 1,
    });
  };

  change = (e) => {
    const { emptyState } = { ...this.state };
    const currentState = emptyState;
    const { name, value } = e.target;

    currentState[name] = value;

    this.setState({
      emptyState: currentState
    });
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

        <QuestionList
          questions={this.state.questions}
          deleteQuestionHandler={(questionIndex) =>
            this.deleteQuestion(questionIndex)
          }
        />

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
