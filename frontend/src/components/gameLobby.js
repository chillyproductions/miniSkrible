import { useState, useEffect } from 'react';

import Chat from './chat.js';
import DrawBoard from './drawBoard.js';
import ToolBar from './ToolBar.js';
import { LeaderBoard } from './leaderBoard.js';

export default function GameLobby(props){
    const [boardSize, setBoardSize] = useState(5);

    useEffect(()=>{
      props.socket.on('size-change', size=>{
        setBoardSize(size);
      })

      props.socket.on('painter', code=>{
        sessionStorage.setItem("painter", true);
        sessionStorage.setItem("painterCode",code);
      })

      props.socket.on('stop-painter', ()=>{
        sessionStorage.setItem("painter", false);
      })
      
      props.socket.on('new-drawing',(name)=>{
        alert(`${name.name} is now drawing!`)
      })
    },[])

    return (
    <>
      <ToolBar socket={props.socket}></ToolBar>  
      <div style={{display:'flex'}}>
        <LeaderBoard players={props.players}></LeaderBoard>
        <DrawBoard socket={props.socket} size={boardSize}></DrawBoard>
        <Chat socket={props.socket}></Chat>
      </div>
    </>
  );
}
