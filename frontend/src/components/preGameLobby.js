import { useEffect } from 'react';

import Chat from './chat.js';
import { PreLeaderBoard } from './leaderBoard.js';

export default function PreGameLobby(props){
    
    function start(){
        props.socket.emit('start',sessionStorage.getItem('painterCode'));
    }

    function canClick(){
        if(sessionStorage.getItem("painter") == "true")
            return false;
        return true;
    }

    useEffect(()=>{
        props.socket.on('disconnect', ()=>{
            sessionStorage.setItem("painter", false);
          })
    },[])

    return(
        <div style={{display:'flex'}}>
            <button onClick={start} disabled={canClick()}>START</button>
            <PreLeaderBoard players={props.players}></PreLeaderBoard>
            <Chat socket={props.socket}></Chat>
        </div>
    )
}