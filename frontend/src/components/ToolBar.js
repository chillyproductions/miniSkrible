import { useState, useEffect } from 'react';


export default function ToolBar(props){
    return(
        <div style={{display:'flex'}}>
            {/* <Timer></Timer> */}
            <Word socket={props.socket}></Word>
        </div>
    )
}

function Word(props){
    const [word,setWord] = useState();

    useEffect(()=>{
        props.socket.on('new-word', word =>{
            setWord(word);
        })
    },[])

    return(
        <div>{word}</div>
    )
}


