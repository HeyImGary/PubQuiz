import React from 'react';
import styles from './NavButton.module.css';

const navButton = (props) => {
  let style = styles.NavButton;

  return (
    <div className={style}>
      <h2>{props.children}</h2>
    </div>
  );
};

export default navButton;
