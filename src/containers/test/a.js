import React from 'react'


const A = (props) => {

    let answers = []
    console.log("hello", props.answers)
    
    for(let x in props.answers){
        console.log("ok", x)
        answers.push(props.answers[x])
        console.log(answers)
    }
    
    return(
        <div>
        <h1>{props.user}</h1>
            {answers.map((answer, index) => (<p>{answer}</p>))}
        </div>
    )
    
}

export default A