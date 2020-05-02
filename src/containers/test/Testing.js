import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from '../../axios-add-questions';
import { Form } from 'react-bootstrap';

import A from './a'

import firebase from '../../firestore';

console.log(firebase.db);
class Testing extends Component {
  state = {
    files: [],
    image: '',
    answers:[],
    users:[],
    questions: [],
    test: ["test", "50", "13", "45"],
    isSet: false,
  };

  change = (e, c) => {
    let tempp = this.state.test

    tempp[e] = c;

    console.log(tempp)

    //this.setState({ file: e.target.files[0] });
  };

  addToAnswers = () => {
    const answers = firebase.db
      .collection('questions')
      .doc('eFnyPXNGZNnwea6UAb2H')
      .collection('answers')
      .doc("Richard")
      .update({answers:this.state.test})
  }

  getQuestions = () => {
    const answers = firebase.db
      .collection('questions')
      .doc('eFnyPXNGZNnwea6UAb2H')
      .collection('questions')
      let t=[];
      
      answers.get().then(e => {
        e.forEach(q => {
          t.push(q.data())
          console.log("hi")
          this.setState({questions: q.data()})
        })
      })
  }

  getQuestions1 = () => {
    const answers = firebase.db
      .collection('questions')
      .doc('eFnyPXNGZNnwea6UAb2H')
      .collection('questionProperties')
      
      
      answers.onSnapshot(e => {
        e.forEach(q => {
          console.log(q.data().questionNumber)
        })
      })
  }

  fileUploadHandler = () => {
    
    const answers = firebase.db
      .collection('questions')
      .doc('eFnyPXNGZNnwea6UAb2H')
      .collection('answers');

    answers
      .onSnapshot(doc => {
      // .then((querySnapshot) => {
        doc.forEach((answers) => {
        let temp = answers.id;
        console.log(temp)
        // console.log(temp)
        let temp2 = this.state.answers;
         let temp3 = answers.data()
        // console.log(temp3)
        temp2[answers.id] = {...temp3}

        this.setState({answers: temp2, isSet: true, users: this.state.users.includes(temp) ? this.state.users : this.state.users.concat(temp)});
        

        })
  })

      // .catch(function (error) {
      //   console.error('Error adding document: ', error);
      // });
}

  logState = () => {
    console.error(this.state.questions);
  };

  render() {

    let testy

    if(this.state.isSet){
      testy = this.state.users.map(user => (
        <A user={user} answers={this.state.answers[user].answers}></A>
      ))
      
    }

    return (
      <div>
        <p onClick={() => this.fileUploadHandler()}>hi</p>
        <p onClick={this.getQuestions}>get questions</p>
        <p onClick={this.logState}>hi</p>
        <p onClick={this.addToAnswers}>hi</p>
         {/* onClick={() => this.change("gary" , {0:2})}>hi</p> */}
         {[testy]}
      </div>
    );
  }
}

export default Testing;
