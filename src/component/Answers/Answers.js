import React from 'react';

import Aux from '../../hoc/Aux'

const answers = (props) => (
    <Aux>
        <h1>{props.values.question}</h1>
        <p>{props.values.answerOne}</p>
        <p>{props.values.answerTwo}</p>
        <p>{props.values.answerThree}</p>
        <p>{props.values.answerFour}</p>
    </Aux>
)

export default answers