import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import styles from './JoinGame.module.css';

import Spinner from '../../component/UI/Spinner/Spinner';

import Answers from './Answers/Answers.js';
import Join from './join';
import Aux from '../../hoc/Aux';

import axios from '../../axios-add-questions';
import { Col } from 'react-bootstrap';

import firebase from '../../firestore'

class JoinGame extends Component {
  state = {
    questions: [],
    roomId: null,
    questionNumber: 0,
    isFetching: false,
    isCorrect: null,
    answers: [],
    disabled: false,
    userName: null
  };

  roomIdHandler = (e) => {
    this.setState({
      roomId: e.target.value,
    });
  };

  updateQuestion = (id) => {
    console.log('question');
    const questionNumber = firebase.db
      .collection('questions')
      .doc('eFnyPXNGZNnwea6UAb2H')
      .collection('questionProperties')
      
      
      questionNumber.onSnapshot(e => {
        e.forEach(q => {
          this.stateState({questionNumber: q.data().questionNumber})
        })
      })
  };

  joinHandler = (id, userName) => {
    console.log("test", userName)
    this.setState({ isFetching: true });
    const questions = firebase.db
      .collection('questions')
      .doc(id)
      
    questions.collection('questions').get().then(e => {
        e.forEach(q => {
          
          console.log("hi")
          this.setState({
            questions: q.data(),
            isFetching: false,
            roomId:id,
            userName: userName
          })
        })
    })

      questions.collection('questionProperties').onSnapshot(e => {
        e.forEach(q => {
          this.setState({questionNumber: q.data().questionNumber, disabled: false})
        })
      })
  };

  sendAnswer = () => {
    console.log(this.state.userName)
    const questions = firebase.db
      .collection('questions')
      .doc(this.state.roomId)
      .collection("answers")
      .doc(this.state.userName)

      this.state.questionNumber === 0 ? questions.set({answers: this.state.answers}) : questions.update({answers: this.state.answers})
  }

  addAnswer = (answer) =>{
    this.setState({
      disabled: true,
      answers:[...this.state.answers, answer]
    }, () => {
    this.sendAnswer()
    })
  }

  logState = () => {
    console.log(this.state)
  }

  render() {
    let questions = (
      <Join
        joinHandler={this.joinHandler}
        roomIdHandler={this.roomIdHandler}
      />
    );

    if (this.state.questions.length !== 0) {
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

        {[questions]}
      </Aux>
    );
  }
}

export default JoinGame;
