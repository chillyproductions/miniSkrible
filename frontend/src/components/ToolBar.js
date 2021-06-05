import { useState, useEffect } from 'react';


export default function ToolBar(props){
    return(
        <div style={{display:'flex'}}>
            <Timer socket={props.socket}></Timer>
            <Word socket={props.socket}></Word>
        </div>
    )
}

function Word(props){
    const [word,setWord] = useState();

    useEffect(()=>{
        props.socket.on('new-drawing', word =>{
            setWord(word.word);
        })
    },[])

    return(
        <div>{word}</div>
    )
}

function Timer(props){
    const [time,setTime] = useState();

    useEffect(()=>{
        var updateClock;
        props.socket.on('new-drawing', time =>{
            setTime(time.roundTime - (new Date().getTime() - time.time));
            clearInterval(updateClock);

            updateClock = setInterval(()=>{
                setTime(time.roundTime - (new Date().getTime() - time.time));
            }, 1000);
        })

        return clearInterval(updateClock)
    },[])
    
    return(
        <div>
            {Math.floor(time/1000)}
        </div>
    )
}


