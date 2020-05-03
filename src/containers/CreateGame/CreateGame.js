import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import axios from '../../axios-add-questions';

import NavButton from '../../component/UI/NavButton/NavButton';
import styles from './CreateGame.module.css';

import QuestionList from './QuestionList/QuestionList';
import Aux from '../../hoc/Aux';

import Test from './test.js';

import firebase from '../../firestore';

class CreateGame extends Component {
  state = {
    questionNumber: 0,
    questions: [],
    questionProps: [
      {
        questionType: "text",
        answerType: "multi",
      },
    ],
    isMultiQuestion: null,
    show: true,
    edit: true,
    questionType: null,
    files: '',
  };

  uploadImageHandler(e) {
    const files = e.target.files;

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.setState({ files: reader.result });
    };
  }

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
      
      files: '',
      questionNumber: this.state.questionNumber + 1,
    });
  };

  uploadQuizHandler = () => {
    let id = _.uniqueId('aa');

    const questions = firebase.db.collection('questions').doc(id);

    questions
      .collection('questions')
      .add({ ...this.state.questions })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      });

    questions.collection('questionProperties').add({ questionNumber: 0 });

  };

  questionPropsHandler = (prop, value) => {
    console.log(prop, value);
    let questionPropsCopy = this.state.questionProps;

    prop === 'answerType'
      ? (questionPropsCopy[0].answerType = value)
      : (questionPropsCopy[0].questionType = value);
    console.log(questionPropsCopy);
    this.setState({
      show: true,
      questionProps: questionPropsCopy,
    });
  };

  logState = () => {
    console.log(this.state);
  };

  render() {
    let questionForm = null;
    if (this.state.show) {
      questionForm = (
        <Aux>
          <Test
            uploadImageHandler={(e) => this.uploadImageHandler(e)}
            image={this.state.files}
            isEditing={true}
            questionType={this.state.questionType}
            addQuestionHandler={(i) => this.AddQuestion(i)}
            questionNumber={this.state.questionNumber}
            questionPropsHandler={this.questionPropsHandler}
            questionProps={this.state.questionProps[0]}
            uploadQuizHandler={this.uploadQuizHandler}
          />
        </Aux>
      );
    }

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
            <hr/>
            <QuestionList
              questions={this.state.questions}
              deleteQuestionHandler={(questionIndex) =>
                this.deleteQuestion(questionIndex)
              }
              />
          </Col>
          <Col xs={12} md={1}>
            <div className={styles.Vl}></div>
          </Col>
          <Col xs={12} md={7}>
            <h1>Add Question</h1>
            <Row className={styles.CenterContent}>
                <Col xs={12} md={2}>
                  <Button
                    onClick={() => this.questionPropsHandler('questionType', 'img')}
                  >
                    Image
                  </Button>
              </Col>
              <Col xs={12} md={2}>
                <Button
                  onClick={() => this.questionPropsHandler('questionType', 'text')}
                >
                  text
                </Button>
              </Col>
            </Row>
            <br />
            <Row className={styles.CenterContent}>
        <Col xs={12} md={2}>
        <Button
          onClick={() => this.questionPropsHandler('answerType', 'multi')}
        >
          Multiple Choice
        </Button>
        </Col>
        <Col xs={12} md={2}>
        <Button onClick={() => this.questionPropsHandler('answerType', 'text')}>
          Text Question
        </Button>
        </Col>
        </Row>

            {this.state.show ? [questionForm] : null}

            <br />

            {this.state.questions.length > 0 ? (
              <Button variant="success" onClick={() => this.uploadQuizHandler()}>
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
