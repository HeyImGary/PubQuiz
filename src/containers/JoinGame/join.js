import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Aux from '../../hoc/Aux';
import styles from './JoinGame.module.css';

import { Form, Button, Row, Col } from 'react-bootstrap';

const initialValues = {
  roomId: '',
  userName: '',
};

const validationSchema = Yup.object({
  roomId: Yup.string().required('Please enter a room id'),
  userName: Yup.string().required('Please enter a room username'),
});

const Join = (props) => {
  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.userName);
      props.joinHandler(values.roomId, values.userName);
    },

    isInitialValid: validationSchema.isValidSync(initialValues),
  });

  return (
    <Aux>
      <Row className={[styles.CenterContent, styles.MainRow]}>
        <Col xs={12} md={12}>
          <h1>Enter Room ID </h1>
        </Col>
      </Row>
      {/* {JSON.stringify(formik, null ,0 )} */}
      <Row className={styles.CenterContent}>
        <Col xs={12} md={3}>
          <Form onSubmit={formik.handleSubmit}>
            {!formik.isValid && formik.touched.roomId ? (
              <p>{formik.errors.roomId}</p>
            ) : null}
            <Form.Control
              id="roomId"
              name="roomId"
              type="text"
              isValid={formik.isValid && formik.touched.roomId}
              isInvalid={!formik.isValid && formik.touched.roomId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.roomId}
            />
            <p>UserName</p>
            <Form.Control
              id="userName"
              name="userName"
              type="text"
              isValid={formik.isValid && formik.touched.userName}
              isInvalid={!formik.isValid && formik.touched.userName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
            />

            <br />
            <Button
              variant="success"
              disabled={!formik.isValid ? true : false}
              type="submit"
            >
              Join
            </Button>
          </Form>
        </Col>
      </Row>
      <br />
    </Aux>
  );
};

export default Join;
