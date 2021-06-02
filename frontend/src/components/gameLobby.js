import { useState, useEffect } from 'react';

import Chat from './chat.js';
import DrawBoard from './drawBoard.js';
import ToolBar from './ToolBar.js';
import { LeaderBoard } from './leaderBoard.js';

export default function GameLobby(props){
    const [boardSize, setBoardSize] = useState(3);

    useEffect(()=>{
      props.socket.on('size-change', size=>{
        console.log('size-change');
        setBoardSize(size);
      })

      props.socket.on('painter', code=>{
        sessionStorage.setItem("painter", true);
        sessionStorage.setItem("painterCode",code);
        alert("paint!");
      })

      props.socket.on('stop-painter', ()=>{
        sessionStorage.setItem("painter", false);
      })

      props.socket.on('disconnect', ()=>{
        sessionStorage.setItem("painter", false);
      })
    },[])

    return (
    <div style={{display:'flex'}}>
      <ToolBar socket={props.socket}></ToolBar>
      <LeaderBoard players={props.players}></LeaderBoard>
      <DrawBoard socket={props.socket} size={boardSize}></DrawBoard>
      <Chat socket={props.socket}></Chat>
    </div>
  );
}
