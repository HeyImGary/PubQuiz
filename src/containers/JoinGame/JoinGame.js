import React, { Component } from 'react';
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap';

import Aux from '../../hoc/Aux';
import Spinner from '../../component/UI/Spinner/Spinner';

import Answers from '../../component/Answers/Answers';
import Join from './join';

import axios from '../../axios-add-questions';
import styles from './JoinGame.module.css';

class JoinGame extends Component {
  state = {
    roodId: ' ',
    questions: [],
    questionNumber: 0,
    isFetching: false,
  };

  roomIdHandler = (e) => {
    this.setState({
      roomId: e.target.value,
    });
  };

  joinHandler = () => {
    this.setState({ isFetching: true });
    console.log('hi', this.state.roomdId);
    axios
      .get('questions/' + this.state.roomId + '.json')
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

  render() {
    let questions = (
      <Join joinHandler={this.joinHandler} roomIdHandler={this.roomIdHandler} />
    );
    let joined = false;
    if (this.state.questions.length !== 0) {
      joined = true;
      questions = (
        <Answers
          values={this.state.questions[this.state.questionNumber]}
          nextQuestionHandler={this.nextQuestionHandler}
        />
      );
    }

    if (this.state.isFetching === true) {
      joined = true;
      questions = <Spinner />;
    }

    return [questions];
  }
}

export default JoinGame;
