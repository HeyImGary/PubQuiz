import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import MultiAnswer from '../MultiAnswer/MultiAnswer';

const createQuestion = (props) => (
  <div>
    <Row className="justify-content-md-center">
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
                  value={props.values.question}
                  onChange={props.change}
                />
              </Form.Group>
            </Col>
          </Row>

          <MultiAnswer values={props.values} change={props.change} />

          <hr />
        </Form>
      </Col>
    </Row>
  </div>
);

export default createQuestion;
