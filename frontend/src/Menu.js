import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import {Get, Create} from './serverContact.js';

export default function Menu(){
    const history = useHistory();
    const idRef = useRef();
    const nameRef = useRef();

    async function join(){
        let id = idRef.current.value;
        if(await Get(id)){
            localStorage.setItem("name",nameRef.current.value);
            history.push('/lobby/'+id);
        }
        //pop error
    }

    async function create(){
        let id = generateCode(5);
        if(!await Get(id)){
            await Create(id);
            localStorage.setItem("name",nameRef.current.value);
            history.push('/lobby/'+id);
        }

        //pop error
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <input ref={nameRef} placeholder="name"></input>
            <button onClick={create}>Create</button>
            <input type="text" ref={idRef} placeholder="lobby ID"></input>
            <button onClick={join}>JOIN</button>
        </div>
    )
}



function generateCode(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for ( let i = 0; i < length; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
}