import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import styles from './JoinGame.module.css';

import Spinner from '../../component/UI/Spinner/Spinner';

import Answers from '../../component/Answers/Answers';
import Join from './join';
import Aux from '../../hoc/Aux';

import axios from '../../axios-add-questions';
import { Row, Col } from 'react-bootstrap';

class JoinGame extends Component {
  state = {
    questions: [],
    questionNumber: 0,
    isFetching: false,
    isCorrect: null,
  };

  roomIdHandler = (e) => {
    this.setState({
      roomId: e.target.value,
    });
  };

  joinHandler = (id) => {
    this.setState({ isFetching: true });
    axios
      .get('questions/' + id + '.json')
      .then((responce) => {
        this.setState({
          questions: responce.data.questions,
          isFetching: false,
        });
      })
      .catch((error) => console.log(error));
  };

  nextQuestionHandler = () => {
    let questionNumber = this.state.questionNumber;
    if (questionNumber !== this.state.questions.length - 1) {
      questionNumber += 1;
      this.setState({
        questionNumber: questionNumber,
      });
    }
  };

  selectAnswerHandler = (answer) => {
    console.log(answer);
    let t =
      this.state.questions[this.state.questionNumber].correctAnswer === answer
        ? true
        : false;
    console.log(t);
    this.setState({
      isCorrect: t,
    });
  };

  render() {
    let questions = (
      <Join
        joinHandler={(id) => this.joinHandler(id)}
        roomIdHandler={this.roomIdHandler}
      />
    );

    if (this.state.questions.length !== 0) {
      questions = (
        <Answers
          selectAnswer={(answer) => this.selectAnswerHandler(answer)}
          values={this.state.questions[this.state.questionNumber]}
          nextQuestionHandler={this.nextQuestionHandler}
          isCorrect={this.state.isCorrect}
        />
      );
    }

    if (this.state.isFetching === true) {
      questions = <Spinner />;
    }

    return (
      <Aux>
        {this.state.isFetching ? null : (
          <Col xs={12} md={{ span: 2, offset: 2 }} className={styles.BackBar}>
            <Link to="/">
              <h4>Back</h4>
            </Link>
          </Col>
        )}
        {this.state.isCorrect ? <h1>Correct!</h1> : <h1>Wrong!</h1>}
        {[questions]}
      </Aux>
    );
  }
}

export default JoinGame;
