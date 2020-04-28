import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from '../../axios-add-questions';

import NavButton from '../../component/UI/NavButton/NavButton';
import styles from './CreateGame.module.css';

import QuestionList from './QuestionList/QuestionList';
import Aux from '../../hoc/Aux';
import Test from '../Home/test';
import { Scope } from '@babel/traverse';

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
    questionType:'img',
    files: ''
  };

  

  uploadImageHandler(e) {

    const Scope = this
    // get the files
    const files = e.target.files; // Process each file
    
    let allFiles = [];

    const file = files[0]; // Make new FileReader

    const reader = new FileReader(); // Convert the file to base64 text
    
    reader.readAsDataURL(file); // on reader load somthing...

    reader.onload = function () {
      // Make a fileInfo Object
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: reader.result,
        file: file
      }; // Push it to the state

      allFiles.push(fileInfo); // If all files have been proceed
      console.log(allFiles[0])
      if(allFiles.length === files.length){
        // Apply Callback function
        //files = allFiles[0]
        //getFiles(allFiles[0]);
        
        Scope.setState({files: allFiles[0].base64})
      }
    } // reader.onload
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

  logState = () => {
    console.log(this.state)
  }

  render() {
    let questionForm = null;
    if (this.state.show) {
      questionForm = (
        <Aux>
          <Test
            isEditing={true}
            questionType={this.state.questionType}
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
        <input type='file' onChange={(e) => this.uploadImageHandler(e)} />
        <img src={this.state.files} />
        <Button onClick={() => this.isMultiHandler(true)}>
          Multiple Choice Question
        </Button>

        <Button onClick={() => this.logState()}>
          console
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
