import React, { useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { isSet } from 'lodash';

import Aux from '../../../hoc/Aux';

import {
  faImage,
  faFont,
  faThLarge,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import FormButton from '../../../component/FormButton/FormButton';

import styles from './NewQuestionForm.module.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

const NewQuestionForm = (props) => {
  const [questionType, updateQuestionType] = useState('text');
  const [answerType, updateAnswerType] = useState('multi');
  const [questionNumber, updateQuestionNumber] = useState(0);
  const [image, updateImage] = useState('');
  let question = [];

  const initialValues = {
    question: isSet(props.question) ? props.question.question : '',
    answers: {
      answerOne: isSet(props.question) ? props.question.answerOne : '',
      answerTwo: isSet(props.question) ? props.question.answerTwo : '',
      answerThree: isSet(props.question) ? props.question.answerThree : '',
      answerFour: isSet(props.question) ? props.question.answeFour : '',
    },
  };

  const uploadImageHandler = (e) => {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      updateImage(reader.result);
    };
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
        {
          question: values.question,
          answers: answerType === 'multi' ? { ...values.answers } : null,
          questionType: questionType,
          answerType: answerType,
          id: questionNumber,
          image: image === '' ? null : image,
        },
        updateQuestionNumber(questionNumber + 1),
        formik.resetForm(formik),
      ];

      props.addQuestionHandler({ ...question[0] });
      formik.resetForm({ values: { ...initialValues } });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.CenterContent}>
      {/* {JSON.stringify(formik, null, 2)} */}
      <Row className={styles.CenterContent}>
        <Col xs={12} md={2}>
          <FormButton
            faImage={faFont}
            clicked={() => updateQuestionType('text')}
          >
            Text
          </FormButton>
        </Col>
        <Col xs={12} md={2}>
          <FormButton
            faImage={faImage}
            clicked={() => updateQuestionType('img')}
          >
            Image
          </FormButton>
        </Col>
      </Row>

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

      {questionType === 'img' ? (
        <Row className={styles.CenterContent}>
          <Col xs={12} md={3}>
            <Form.File
              placeholder="Image"
              name="image"
              value={formik.values.image}
              onBlur={formik.handleBlur}
              onChange={(e) => uploadImageHandler(e)}
            />
          </Col>
        </Row>
      ) : null}
      {image !== '' ? (
        <Row className={styles.CenterContent}>
          <img src={image} className={styles.ImageHeight} />
        </Row>
      ) : null}

      <Row className={styles.CenterContent}>
        <Col xs={12} md={2}>
          <FormButton
            faImage={faThLarge}
            clicked={() => updateAnswerType('multi')}
          >
            Multiple Choice
          </FormButton>
        </Col>
        <Col xs={12} md={2}>
          <FormButton
            faImage={faQuoteLeft}
            clicked={() => updateAnswerType('text')}
          >
            Open Ended
          </FormButton>
        </Col>
      </Row>

      {answerType === 'multi' ? (
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
        </Aux>
      ) : null}

      <hr />
      <Button type="submit">Add Question</Button>
    </Form>
  );
};

export default NewQuestionForm;
