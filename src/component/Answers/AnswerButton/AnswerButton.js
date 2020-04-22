import React from 'react';
import styles from './AnswerButton.module.css';

const answerButton = (props) => {
  let style = styles.NavButton;

  if (props.correct) style = styles.Correct;
  return (
    <div onClick={() => props.click()} className={style}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default answerButton;
