import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import styles from './JoinGame.module.css';

import Spinner from '../../component/UI/Spinner/Spinner';

import Answers from '../../component/Answers/Answers';
import Join from './join';
import Aux from '../../hoc/Aux';

import axios from '../../axios-add-questions';
import { Col } from 'react-bootstrap';

class JoinGame extends Component {
  state = {
    questions: [],
    questionNumber: 0,
    isFetching: false,
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

  render() {
    let questions = (
      <Join
        joinHandler={(id) => this.joinHandler(id)}
        roomIdHandler={this.roomIdHandler}
      />
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
