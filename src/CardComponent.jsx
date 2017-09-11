import React from 'react';
import Paper from 'material-ui/Paper';

const CardComponent = (props) => (
    <Paper style={props.style}
           zDepth={3}
           rounded={false}
           >
           <div>{props.title}</div>
           <div>{props.link}</div>
           <div>{props.children}</div>
    </Paper>
)

export default CardComponent;
