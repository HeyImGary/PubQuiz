import React from 'react';

import { Row, Col, Form } from 'react-bootstrap';
import Aux from '../../hoc/Aux';

const multiAnswer = (props) => (
    <Aux>
        <Row>
            <Col xs={12} md={6}>
            <Form.Group controlId="answerOne">
                <Form.Control
                type="text"
                placeholder="Answer 1"
                name="answerOne"
                value={props.values.answerOne}
                onChange={props.change}
                />
            </Form.Group>
            </Col>

            <Col xs={12} md={6}>
            <Form.Group controlId="answerTwo">
                <Form.Control
                type="text"
                placeholder="Answer 2"
                name="answerTwo"
                value={props.values.answerTwo}
                onChange={props.change}
                />
            </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col xs={12} md={6}>
            <Form.Group controlId="answerThree">
                <Form.Control
                type="text"
                placeholder="Answer 3"
                name="answerThree"
                value={props.values.answerThree}
                onChange={props.change}
                />
            </Form.Group>
            </Col>

            <Col xs={12} md={6}>
            <Form.Group controlId="answerFour">
                <Form.Control
                type="text"
                placeholder="Answer 4"
                name="answerFour"
                value={props.values.answerFour}
                onChange={props.change}
                />
            </Form.Group>
            </Col>
        </Row>
    </Aux>
)

export default multiAnswer