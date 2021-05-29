import { useState , useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import './chat.css';

const socket = io('http://localhost:3001/');

export default function Chat(){
    let {id} = useParams();
    const [messages, setMsg] = useMsg(id);
    const scrollRef = useRef();

    useEffect(()=>{
        socket.on('msg-recived', data =>{
            setMsg(data);
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        })
    },[]);
    
    return(
        <div className="chatCover">
            <div>{id}</div>
            <div className="chat" ref={scrollRef}>
                {messages.map((msg,msgIndex)=>(
                    <Message 
                    name={msg.name}
                    msg={msg.msg}
                    index={msgIndex}
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
    return(
        <div key={props.index}>{props.name}: {props.msg}</div>
    )
}

function InputMessage(props){
    const input = useRef();

    function sendMsg(){
        let inputValue = input.current.value;
        socket.emit('send-msg', {msg:inputValue, name:localStorage.getItem("name")});
        props.set({msg:inputValue,name:"you"});
        input.current.value = '';
    }

    useEffect(()=>{
        function send(key){
            if(key.key === "Enter") {
                sendMsg();
            }
        }

        window.addEventListener('keydown', key=> send(key));
        return (window.removeEventListener('keydown', key=> send(key)))
    },[]);

    return(
        <div>
            <input type="text" ref={input}></input>
            <button onClick={sendMsg}>SEND</button>
        </div>
    )
}

function useMsg(id){
    const [messages, setMsgs] = useState([]);

    useEffect(()=>{ 
        socket.emit('join-room', {id:id, name:localStorage.getItem("name")});
    },[id]);

    function Set(data){
        setMsgs(msgs =>([...msgs,data]));
    }

    return [messages,Set];
}