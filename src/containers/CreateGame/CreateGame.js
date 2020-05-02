import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        questionType: null,
        answerType: null,
      },
    ],
    isMultiQuestion: null,
    show: false,
    edit: true,
    questionType: null,
    files: '',
  };

  uploadImageHandler(e) {
    // get the files
    const files = e.target.files;
    // Process each file

    const file = files[0];
    // Make new FileReader

    const reader = new FileReader();
    // Convert the file to base64 text

    // on reader load somthing...
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
      show: false,
      files: '',
      questionNumber: this.state.questionNumber + 1,
    });
  };


  uploadQuizHandler = () => {
    const post = {
      questions: this.state.questions,
    };

    const questions = firebase.db
      // .collection('questions')
      // .doc()
      // .collection('questions')
      // .add({ ...this.state.questions })
      // .then(function (docRef) {
      //   console.log('Document written with ID: ', docRef.id);
      // })
      // .catch(function (error) {
      //   console.error('Error adding document: ', error);
      // });
      .collection('questions')
      .doc('eFnyPXNGZNnwea6UAb2H')
      .collection('answers')
      .doc('Gary')
      .update({ 2: 'test2' })
      .then(function (docRef) {
        console.log('Document written with ID: ');
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
    // axios
    //   .post('/questions.json', post)
    //   .then((responce) => this.setState({ roomId: responce.data.name }))
    //   .catch((error) => console.log(error));
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
            questionProps={this.state.questionProps[0]}
            uploadQuizHandler={this.uploadQuizHandler}
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

        <QuestionList
          questions={this.state.questions}
          deleteQuestionHandler={(questionIndex) =>
            this.deleteQuestion(questionIndex)
          }
        />

        {/* <input type="file" onChange={(e) => this.uploadImageHandler(e)} />
        <img src={this.state.files} /> */}

        <Button
          onClick={() => this.questionPropsHandler('questionType', 'img')}
        >
          Image
        </Button>

        <Button
          onClick={() => this.questionPropsHandler('questionType', 'text')}
        >
          text
        </Button>
        <br />

        <Button
          onClick={() => this.questionPropsHandler('answerType', 'multi')}
        >
          Multiple Choice Question
        </Button>

        <Button onClick={() => this.questionPropsHandler('answerType', 'text')}>
          Text Question
        </Button>

        <br />
        <Button onClick={() => this.logState()}>log console</Button>

        {/* <Button onClick={() => this.logState()}>console</Button> */}

        {this.state.show ? [questionForm] : null}

        <br />

        {this.state.questions.length > 0 ? (
          <Button variant="success" onClick={() => this.uploadQuizHandler()}>
            Submit Questions
          </Button>
        ) : null}
      </Aux>
    );
  }
}

export default CreateGame;
