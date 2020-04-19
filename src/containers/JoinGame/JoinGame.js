import React, { Component } from 'react';
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap';

import Aux from '../../hoc/Aux'
import Spinner from '../../component/UI/Spinner/Spinner'

import Answers from '../../component/Answers/Answers'

import axios from '../../axios-add-questions'

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
    console.log(this.state.roomId)
    axios.get('questions/-M5EYFt9o8ZAxwhJk8Xg.json')
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
        <Row className="MainRow justify-content-md-center">
          <Col xs={12} md={12}>
            <h1>Enter Room ID</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={3}>
            <Form>
              <FormControl
                type="text"
                placeholder="RoomId"
                name="roomId"
                onChange={this.roomIdHandler}
              />
            </Form>
          </Col>
        </Row>
        
        <Row className="justify-content-md-center">
          <Col xs={12} md={3}>
            
            <Button variant="success" onClick={this.joinHandler}> Join </Button>
          </Col>
        </Row>
      </Aux>):(
      <Aux>
        <Row className="justify-content-md-center">

            {questions}

        </Row>
        <Row className="justify-content-md-center">
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
