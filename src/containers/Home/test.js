import React from 'react';
import axios from '../../axios-add-questions';

import * as Yup from 'yup';
import { useFormik, Field } from 'formik';

import Aux from '../../hoc/Aux';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Test = (props) => {
  let question = [];

  const initialValues = {
    question: '',
    answers: {
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      answerFour: '',
    },
  };

  const validationSchema = Yup.object({
    question: Yup.string().min(2, 'nope').required('Please enter a room id'),
    answerOne: Yup.string().min(2, 'nope').required('Please enter a room id'),
    answerTwo: Yup.string().min(2, 'nope').required('Please enter a room id'),
    answerThree: Yup.string().min(2, 'nope').required('Please enter a room id'),
    answerFour: Yup.string().min(2, 'nope').required('Please enter a room id'),
  });

  const formik = useFormik({
    initialValues: { initialValues },
    isInitialValid: validationSchema.isValidSync(initialValues),
    validationSchema: validationSchema,

    onSubmit: (values) => {
      let answers = {
        answerOne: values.answerOne,
        answerTwo: values.answerTwo,
        answerThree: values.answerThree,
        answerFour: values.answerFour,
      };
      question = [
        ...question,
        { question: values.question, answers: { ...answers } },
      ];

      props.addQuestionHandler({ ...question[0] });

      console.log(question);
      formik.resetForm({ values: {} });
    },
  });

  const isMultiQuestion = true;
  return (
    <Aux>
      <Form onSubmit={formik.handleSubmit}>
        {JSON.stringify(formik, null, 2)}
        <Row>
          <Col>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Question"
              name="question"
              value={formik.values.question || ''}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Col>
        </Row>
        {isMultiQuestion ? (
          <Aux>
            <Row>
              <Col xs={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Answer 1"
                  name="answerOne"
                  value={formik.values.answerOne || ''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Col>

              <Col xs={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Answer 2"
                  name="answerTwo"
                  value={formik.values.answerTwo || ''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Answer 3"
                  name="answerThree"
                  value={formik.values.answerThree || ''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Col>

              <Col xs={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Answer 4"
                  name="answerFour"
                  value={formik.values.answerFour || ''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Col>
            </Row>
          </Aux>
        ) : null}
        <Button type="submit">Submit</Button>
      </Form>
    </Aux>
  );
};

export default Test;
