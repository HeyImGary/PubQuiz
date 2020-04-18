import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function JoinRoom() {
  return (
    <div>
      <Row>
        <Col Col xs={12} md={{ span: 2, offset: 2 }} className="Card">
          <Link to="/">
            <h4>Back</h4>
          </Link>
        </Col>
      </Row>
      <Row className="MainRow justify-content-md-center">
        <Col xs={12} md={12}>
          <h1>Enter Room ID</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={3}>
          <FormControl
            md={2}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={3} className="Card">
          <Link to="/create">
            <h2>Join</h2>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default JoinRoom;
