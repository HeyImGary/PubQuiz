import React, { Component } from 'react';

import Spinner from '../../component/UI/Spinner/Spinner';

import Answers from './Answers/Answers.js';
import Aux from '../../hoc/Aux';

import queryString from 'query-string';

import firebase from '../../firestore';

import styles from './Play.module.css';

import { Form, Button, Row, Col } from 'react-bootstrap';

class play extends Component {
  state = {
    questions: [],
    roomId: null,
    questionNumber: 0,
    isFetching: false,
    answers: [],
    disabled: false,
    userName: null,
    play: false,
  };

  addAnswer = (answer) => {
    this.setState(
      {
        disabled: true,
        answers: [
          ...this.state.answers,
          'question ' + this.state.questionNumber + ': ' + answer,
        ],
      },
      () => {
        const questions = firebase.db
          .collection('questions')
          .doc(this.state.roomId)
          .collection('answers')
          .doc(this.state.userName);

        this.state.questionNumber === 0
          ? questions.set({ answers: this.state.answers })
          : questions.update({ answers: this.state.answers });
      }
    );
  };

  componentDidMount = () => {
    const id = queryString.parse(this.props.location.search).roomId;
    //const nickName = this.props.location.state.nickName;

    const questions = firebase.db.collection('questions').doc(id);
    questions
      .collection('questions')
      .get()
      .then((e) => {
        e.forEach((q) => {
          this.setState({
            questions: q.data(),
            isFetching: false,
            roomId: id,
            userName: '',
          });
        });
      });
    questions.collection('questionProperties').onSnapshot((e) => {
      e.forEach((q) => {
        this.setState({
          questionNumber: q.data().questionNumber,
          disabled: false,
        });
      });
    });
  };

  logState = () => {
    console.log(this.state);
  };

  render() {
    let questions = <Spinner />;

    if (this.state.questions.length !== 0 && this.state.play === true) {
      questions = (
        <Answers
          disabled={this.state.disabled}
          addAnswerHandler={this.addAnswer}
          questionNumber={this.state.questionNumber}
          selectAnswer={(answer) => this.selectAnswerHandler(answer)}
          values={this.state.questions[this.state.questionNumber]}
          nextQuestionHandler={this.nextQuestionHandler}
        />
      );
    } else {
      questions = (
        <Row className={[styles.CenterContent, styles.MainRow]}>
          <Col xs={12} md={6}>
            <h1>Enter a Nickname:</h1>
            <Form.Control
              id="roomId"
              name="roomId"
              type="text"
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
            <br />
            <Button onClick={() => this.setState({ play: true })}>
              LETS PLAY!
            </Button>
          </Col>
        </Row>
      );
    }

    return <Aux>{[questions]}</Aux>;
  }
}

export default play;
