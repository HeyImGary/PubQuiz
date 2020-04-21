import React from 'react';
import styles from './NavButton.module.css';

const navButton = (props) => (
  <div className={styles.NavButton}>
    <h2>{props.children}</h2>
  </div>
);

export default navButton;
