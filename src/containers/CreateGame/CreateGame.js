import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { uniqueId, isEmpty } from 'lodash';

import styles from './CreateGame.module.css';

import QuestionList from './QuestionList/QuestionList';
import Aux from '../../hoc/Aux';

import NewQuestionForm from './NewQuestionForm/NewQuestionForm.js';

import firebase from '../../firestore';

class CreateGame extends Component {
  state = {
    questions: [],
    edit: true,
    files: '',
  };

  //Delete Question handler
  deleteQuestionHandler = (questionIndex) => {
    const questions = [...this.state.questions];
    questions.splice(questionIndex, 1);
    this.setState({ questions: questions });
  };

  //Add question to question list
  addQuestionHandler = (newQuestion) => {
    this.setState({
      questions: [...this.state.questions, newQuestion],
      files: '',
    });
  };

  //Upload question to database
  uploadQuizHandler = () => {
    let id = uniqueId('aa');
    const questions = firebase.db.collection('questions').doc(id);
    questions
      .collection('questions')
      .add({ ...this.state.questions })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      });
    //Add question properties collection
    questions.collection('questionProperties').add({ questionNumber: 0 });
  };

  logState = () => {
    console.log(this.state);
  };

  render() {
    return (
      <Aux>
        {/* <Col xs={12} md={{ span: 2, offset: 2 }} className={styles.BackBar}>
          <Link to="/">
            <h4>Back</h4>
          </Link>
        </Col> */}
        <Row>
          <Col xs={12} md={3} className={styles.Overflow}>
            <h1>Question List</h1>

            <hr />
            {this.state.questions.map((question, index) => (
              <QuestionList
                question={question}
                questionNumber={index}
                deleteQuestionHandler={(questionIndex) =>
                  this.deleteQuestionHandler(questionIndex)
                }
              />
            ))}
          </Col>
          <Col xs={12} md={1}>
            <div className={styles.Vl}></div>
          </Col>
          <Col xs={12} md={7} className={[styles.CenterContent, styles.Center]}>
            <h1>Add Question</h1>
            <hr />
            <NewQuestionForm
              addQuestionHandler={this.addQuestionHandler}
              uploadQuizHandler={this.uploadQuizHandler}
            />

            <br />

            {!isEmpty(this.state.questions.length) ? (
              <Button
                variant="success"
                onClick={() => this.uploadQuizHandler()}
              >
                Submit Questions
              </Button>
            ) : null}
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default CreateGame;
