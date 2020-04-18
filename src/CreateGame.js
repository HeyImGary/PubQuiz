import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const createGame = () => {
  return (
    <div>
      <Row>
        <Col Col xs={12} md={{ span: 2, offset: 2 }} className="Card">
          <Link to="/">
            <h4>Back</h4>
          </Link>
        </Col>
      </Row>
      <Row className="MainRow ">
        <Col xs={12} md={{ span: 3, offset: 2 }} className="Card">
          <Link to="/play">
            <h2>Public Game</h2>
          </Link>
        </Col>

        <Col xs={12} md={{ span: 3, offset: 2 }} className="Card">
          <Link to={`create/form`}>
            <h2>Private Game</h2>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default createGame;
