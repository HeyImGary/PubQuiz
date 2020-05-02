import React from 'react';
import styles from './AnswerButton.module.css';

let style = styles.NavButton;

const AnswerButton = (props) => {
  const clicked = () => {
    //style = styles.Selected;
  };

  return (
    <div disabled={props.disabled} onClick={() => props.clicked()} tabIndex="1" className={props.disabled ? styles.Disabled : styles.NavButton}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default AnswerButton;
