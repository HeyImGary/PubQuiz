import React from 'react';
import styles from './FormButton.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormButton = (props) => {
  return (
    <div
      disabled={props.disabled}
      tabIndex="1"
      onClick={props.clicked}
      className={styles.NavButton}
    >
      <FontAwesomeIcon icon={props.faImage} size="lg" className={styles.Icon} />
      <h5>{props.children}</h5>
    </div>
  );
};

export default FormButton;
