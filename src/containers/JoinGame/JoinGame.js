import React, { Component } from 'react';
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap';

import Aux from '../../hoc/Aux'
import Spinner from '../../component/UI/Spinner/Spinner'

import Answers from '../../component/Answers/Answers'

import axios from '../../axios-add-questions'
import styles from './JoinGame.module.css'

class JoinGame extends Component {
  state = {
    roodId: " " ,
    questions: [],
    questionNumber: 0,
    isFetching: false
  }

  roomIdHandler = (e) => {
    
    this.setState({
      roomId: e.target.value
    })  
    
  }

  joinHandler = () => {
    this.setState({isFetching: true})
    console.log("hi", this.state.roomdId)
    axios.get('questions/'+this.state.roomId+'.json')
      .then((responce) => {
        
        this.setState({
          questions: responce.data.questions,
          isFetching: false
        })
      })
      .catch((error) => console.log(error));
      
  }

  nextQuestionHandler = () => {
    let questionNumber = this.state.questionNumber
    if(questionNumber !== this.state.questions.length - 1){
      questionNumber += 1
      this.setState({
        questionNumber: questionNumber
      })
    }   
  }


  render (){
    
    let questions = null
    let joined = false
    if ( this.state.questions.length !== 0){
      joined = true
      questions = (
        <Answers values={this.state.questions[this.state.questionNumber]} />
        
      )
    }
    
    if ( this.state.isFetching === true){
      joined = true
      questions = (
        <Spinner />
      )
    }
    
    return (
      
      !joined ? (
      <Aux>
        <Row className={[styles.CenterContent, styles.MainRow]}>
          <Col xs={12} md={12}>
            <h1>Enter Room ID {this.state.roomId}</h1>
          </Col>
        </Row>
        <Row className={styles.CenterContent}>
          <Col xs={12} md={3}>
              <Form.Control
                type="text"
                placeholder="RoomId"
                name="roomId"
                onChange={e => this.roomIdHandler(e)}
                />
          </Col>
        </Row>
        
        <Row className={styles.CenterContent}>
          <Col xs={12} md={3}>
            
            <Button variant="success" onClick={this.joinHandler}> Join </Button>
          </Col>
        </Row>
      </Aux>):(
      <Aux>
        <Row className={styles.CenterContent}>

            {questions}

        </Row>
        <Row className={styles.CenterContent}>
          <Col xs={12} md={3}>
            
            
            {!this.state.isFetching ? <Button variant="success" onClick={this.nextQuestionHandler}> Next Question  </Button> : null }
          </Col>
        </Row>
        
      </Aux>
      )
      
    )
  }

}

export default JoinGame;
