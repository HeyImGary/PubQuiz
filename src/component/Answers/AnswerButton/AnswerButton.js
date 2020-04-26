import React from 'react';
import styles from './AnswerButton.module.css';

let style = styles.NavButton;

const answerButton = (props) => {
  const clicked = () => {
    style = styles.Selected;
    console.log('what?', style);
  };

  return (
    <div onClick={() => clicked()} tabindex="1" className={styles.NavButton}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default answerButton;
