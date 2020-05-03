import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Aux from '../../hoc/Aux';

import styles from './CreateGame.module.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Test = (props) => {
  const isMultiQuestion = false;
  let question = [];

  const initialValues = {
    question: '',
    answers: {
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      answerFour: '',
    },
    correctAnswer: 'answerOne',
  };

  const validationSchema = Yup.object(
    {
      question: Yup.string().min(2, 'nope').required('Please enter a room id'),
    },
    props.isMilti
      ? {
          answerOne: Yup.string()
            .min(2, 'nope')
            .required('Please enter a room id'),
          answerTwo: Yup.string()
            .min(2, 'nope')
            .required('Please enter a room id'),
          answerThree: Yup.string()
            .min(2, 'nope')
            .required('Please enter a room id'),
          answerFour: Yup.string()
            .min(2, 'nope')
            .required('Please enter a room id'),
        }
      : null
  );

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema: validationSchema,
    initialErrors: validationSchema.isValidSync({ ...initialValues }),

    onSubmit: (values) => {
      question = [
        ...question,
        {
          question: values.question,
          answers:
            props.questionProps.answerType === 'multi'
              ? { ...values.answers }
              : null,
          questionType: props.questionProps.questionType,
          answerType: props.questionProps.answerType,
          id: props.questionNumber,
          image: props.image === '' ? null : props.image,
          correctAnswer: values.correctAnswer,
        },
        formik.resetForm(formik)
      ];

      props.addQuestionHandler({ ...question[0] });

      console.log(question);
      formik.resetForm({ values: {...initialValues} });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.CenterContent}>
      {/* {JSON.stringify(formik, null, 2)} */}

      <Row>
        <Col xs={12} md={12}>
          <Form.Control
            as="textarea"
            rows="2"
            placeholder="Question"
            name="question"
            value={formik.values.question}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Col>
      </Row>

      {props.questionProps.questionType === 'img' && props.image === '' ? (
        <Row className={styles.CenterContent}>
          <Col xs={12} md={3}>
            <Form.File
              placeholder="Image"
              name="image"
              value={formik.values.image}
              onBlur={formik.handleBlur}
              onChange={props.uploadImageHandler}
            />
          </Col>
        </Row>
      ) : null}
      {props.image !== '' ? (
        <Row className={styles.CenterContent}>
          <img src={props.image} className={styles.ImageHeight} />
        </Row>
      ) : null}
      {props.questionProps.answerType === 'multi' ? (
        <Aux>
          <Row className={styles.Padding}>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Answer 1"
                name="answers.answerOne"
                value={formik.values.answers.answerOne}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Col>

            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Answer 2"
                name="answers.answerTwo"
                value={formik.values.answers.answerTwo}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>

          <Row className={styles.Padding}>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Answer 3"
                name="answers.answerThree"
                value={formik.values.answers.answerThree}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Col>

            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Answer 4"
                name="answers.answerFour"
                value={formik.values.answers.answerFour}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>

          {/* <Row className={styles.Padding}>
            <Col xs={12} md={12}>
              <p>Correct Answer:</p>
              <Form.Control
                as="select"
                name="correctAnswer"
                value={formik.values.correctAnswer}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <option value="answerOne">1</option>
                <option value="answerTwo">2</option>
                <option value="answerThree">3</option>
                <option value="answerFour">4</option>
              </Form.Control>
            </Col>
          </Row> */}
        </Aux>
      ) : null}

      <hr />
      <Button type="submit">Save Question</Button>
    </Form>
  );
};

export default Test;
