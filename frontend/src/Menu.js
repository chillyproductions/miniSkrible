import { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {Get, Create} from './serverContact.js';

import Logo from './components/assets/rainbowLogo.png';
import './components/css/menu.css';

export default function Menu(){
    const history = useHistory();
    const idRef = useRef();
    const nameRef = useRef();

    useEffect(()=>{
        sessionStorage.setItem("painter", false);
    },[])

    async function join(){
        let id = idRef.current.value;
        if(nameRef.current.value){
            if(await Get(id)){
                sessionStorage.setItem("name",nameRef.current.value);
                history.push('/lobby/'+id);
            }
        }
    }

    async function create(){
        let id = generateCode(5);
        if(nameRef.current.value){
            if(!await Get(id)){
                await Create(id);
                sessionStorage.setItem("name",nameRef.current.value);
                history.push('/lobby/'+id);
            }
        }
    }

    return(
        <div className="menu">
            <img className="logo" src={Logo} alt={"Logo"}></img>
            <div className="menuCover" style={{display: "flex", flexDirection: 'column'}}>
                <input className="nameInput" ref={nameRef} placeholder="name"></input>
                <button className="createButton" onClick={create}>Create</button>
                <input className="idInput" type="text" ref={idRef} placeholder="lobby ID"></input>
                <button className="joinButton" onClick={join}>Join</button>
            </div>
            <label style={{color:'white'}}>By Nathan Reitblat</label>
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