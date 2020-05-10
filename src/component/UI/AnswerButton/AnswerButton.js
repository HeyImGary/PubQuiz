import React from 'react';
import styles from './AnswerButton.module.css';

const AnswerButton = (props) => {
  return (
    <div
      disabled={props.disabled}
      onClick={() => props.clicked()}
      tabIndex="1"
      className={props.disabled ? styles.Disabled : styles.NavButton}
    >
      <h3>{props.children}</h3>
    </div>
  );
};

export default AnswerButton;
