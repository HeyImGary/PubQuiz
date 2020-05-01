import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from '../../axios-add-questions';
import { Form } from 'react-bootstrap';

import firebase from '../../firestore';

console.log(firebase.db);
class Testing extends Component {
  state = {
    files: [],
    image: '',
  };

  change = (e) => {
    console.log(e.target.files[0]);

    //this.setState({ file: e.target.files[0] });
  };

  fileUploadHandler = () => {
    const answers = firebase.db
      .collection('questions')
      .doc('eFnyPXNGZNnwea6UAb2H')
      .collection('answers');

    answers
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          let temp = doc.id;
          let temp2 = [doc.data()];
          console.log(temp2);
          temp2.map((t) => console.log('hi', t.0));
          console.log(temp);
        });
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  };

  logState = () => {
    console.error(this.state);
  };

  render() {
    return (
      <div>
        <p onClick={() => this.fileUploadHandler()}>hi</p>
        <p onClick={this.logState}>hi</p>
      </div>
    );
  }
}

export default Testing;
