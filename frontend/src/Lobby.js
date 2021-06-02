import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import {Get} from './serverContact.js';
import PreGameLobby from './components/preGameLobby.js';
import GameLobby from './components/gameLobby.js';

const socket = io('http://localhost:3001');

export default function Lobby(){
    const {id} = useParams();
    const history = useHistory();

    if(!Get(id)){history.push('/')}

    var [lobby, setLobby] = useState();

    useEffect(()=>{ 
        socket.on('lobby-change', data=>{
            setLobby(data);
        });

        socket.emit('join-room', {id:id, name:sessionStorage.getItem("name")});
    },[]);

    if(lobby){
        return(
            <>
                {lobby.started ? 
                <GameLobby 
                socket={socket}
                players={lobby.players}
                ></GameLobby>
                :
                <PreGameLobby
                socket={socket}
                players={lobby.players}
                ></PreGameLobby>}
            </>
        )
    }
    return(
        <div>hello</div>
    )
}