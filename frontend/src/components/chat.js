import { useState , useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './css/chat.css';

var socket;

export default function Chat(props){
    let {id} = useParams();
    const [messages, setMsg] = useMsg(id);
    const scrollRef = useRef();

    useEffect(()=>{
        socket = props.socket;

        socket.on('msg-recived', data =>{
            setMsg(data);
        })
    },[]);

    useEffect(()=>{
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    },[scrollRef.current?.scrollHeight])
    
    return(
        <div className="chatCover">
            <div>{id}</div>
            <div className="chat" ref={scrollRef}>
                {messages.map((msg,msgIndex)=>(
                    <Message 
                    name={msg?.name}
                    msg={msg.msg}
                    gameTalking={msg?.gameTalking}
                    key={msgIndex}
                    ></Message>
                ))}
            </div>
            <InputMessage 
            set={setMsg}
            ></InputMessage>
        </div>    
    )
}

function Message(props){
    if(props.gameTalking){
        return(<div className="gameTalking">{props.msg}</div>)
    }
    else{
        return(<div>{props.name}: {props.msg}</div>)
    }
}

function InputMessage(props){
    const input = useRef();

        function sendMsg(){
            let inputValue = input.current?.value;
            socket.emit('send-msg', {msg:inputValue, name:sessionStorage.getItem("name")});
            props.set({msg:inputValue,name:"you"});
            if(input.current?.value)
                input.current.value = '';
        }

    useEffect(()=>{
        function send(key){
            if(key.key === "Enter") {
                sendMsg();
            }
        }
        
        window.addEventListener('keydown', key=>send(key));
        return window.removeEventListener('keydown', key=>send(key));
    },[]);

    return(
        <div>
            <input type="text" ref={input}></input>
            <button onClick={sendMsg}>SEND</button>
        </div>
    )
}

function useMsg(){
    const [messages, setMsgs] = useState([]);

    function Set(data){
        setMsgs(msgs =>([...msgs,data]));
    }

    return [messages,Set];
}
