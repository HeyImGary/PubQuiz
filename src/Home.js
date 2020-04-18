import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Row className="MainRow ">
        <Col>
          <h1>Pub Quiz Time</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={{ span: 3, offset: 2 }} className="Card">
          <Link to="/play">
            <h2>Play Game</h2>
          </Link>
        </Col>

        <Col xs={12} md={{ span: 3, offset: 2 }} className="Card ">
          <Link to="/create">
            <h2>Create Game</h2>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
