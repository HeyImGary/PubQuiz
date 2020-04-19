import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../axios-add-questions';

import CreateQuestion from '../../component/CreateQuestion/CreateQuestion';
import MultiAnswer from '../../component/MultiAnswer/MultiAnswer';

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
    edit: true,
  };

  deleteQuestion = (questionIndex) => {
    const questions = [...this.state.questions];
    questions.splice(questionIndex, 1);
    this.setState({ questions: questions });
  };

  AddQuestion = (i, q, a1, a2, a3, a4) => {
    const questions = [
      ...this.state.questions,
      {
        id: i,
        question: q,
        answerOne: a1,
        answerTwo: a2,
        answerThree: a3,
        answerFour: a4,
        edit: false,
      },
    ];
    this.setState({
      questions: questions,
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

  editChange = (e, id) => {
    const temp = { ...this.state.questions[id] };
    const currentState = temp;
    const { name, value } = e.target;
    currentState[name] = value;

    const questions = [...this.state.questions];
    questions[id] = currentState;

    this.setState({
      questions: questions,
    });
  };

  onSubmit = (e) => {
    this.AddQuestion(
      this.state.questionNumber,
      this.state.emptyState.question,
      this.state.emptyState.answerOne,
      this.state.emptyState.answerTwo,
      this.state.emptyState.answerThree,
      this.state.emptyState.answerFour
    );
    this.setState({
      emptyState: {
        question: '',
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: '',
      },
    });
  };

  save = () => {
    const post = {
      questions: this.state.questions,
    };

    axios
      .post('/questions.json', post)
      .then((responce) => console.log(responce))
      .catch((error) => console.log(error));
  };

  editQuestion = (id, bool) => {
    const questionIndex = this.state.questions.findIndex((q) => {
      return q.id === id;
    });
    const editQuestion = { ...this.state.questions[questionIndex] };

    editQuestion.edit = bool;

    const questions = [...this.state.questions];

    questions[questionIndex] = editQuestion;

    this.setState({
      questions: questions,
    });
  };

  render() {
    console.log("hi")
    return (
      <div>
        <Row>
          <Col xs={12} md={{ span: 2, offset: 2 }} className="Card">
            <Link to="/">
              <h4>Back</h4>
            </Link>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12} md={12}>
            {this.state.questions.map((q, index) => (
              <Row className="justify-content-md-center" key={index}>
                {q.edit ? (
                  <Col xs={12} md={6}>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group controlId="question">
                            <Form.Control
                              as="textarea"
                              rows="3"
                              placeholder="Question 1"
                              name="question"
                              value={q.question}
                              onChange={(e) => this.editChange(e, q.id)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <MultiAnswer values={q} change={(e) => this.editChange(e, q.id)}/>              

                      <Row>
                        <Col xs={12} md={12}>
                          <Button
                            variant="success"
                            onClick={() => this.editQuestion(q.id, false)}
                          >
                            Save
                          </Button>
                        </Col>
                      </Row>
                      <hr />
                    </Form>
                  </Col>
                ) : (
                  <Col xs={12} md={6}>
                    <Row>
                      <Col>Questions {index}: {q.question}</Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={6}>
                        Answer 1: {q.answerOne}
                      </Col>

                      <Col xs={12} md={6}>
                        Answer 2 :{q.answerTwo}
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={6}>
                        Answer 3: {q.answerThree}
                      </Col>

                      <Col xs={12} md={6}>
                        Answer 4: {q.answerFour}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={6}>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteQuestion(index)}
                        >
                          Delete
                        </Button>
                      </Col>

                      <Col xs={12} md={6}>
                        <Button
                          variant="success"
                          onClick={() => this.editQuestion(q.id, true)}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                  </Col>
                )}
              </Row>
            ))}
          </Col>
        </Row>

        <Row>
          <Col>
            {this.state.questions.length < 1 ? (
              <h1>Press the '+' button to add a new question</h1>
            ) : null}

            <CreateQuestion
              click={this.AddQuestion}
              change={this.change}
              
              values={this.state.emptyState}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Button onClick={(e) => this.onSubmit(e, 'create')}>
              <h2>+</h2>
            </Button>
            <hr />
            <Button variant="success" onClick={() => this.save()}>
              Submit Questions
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateGame;
