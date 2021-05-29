import {useParams, useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import Chat from './components/chat.js';
import DrawBoard from './components/drawBoard.js';
import {Get} from './serverContact.js';


const socket = io('http://localhost:3001');

export default function Lobby() {
  const {id} = useParams();
  const history = useHistory();

  if(!Get(id)){
    history.push('/');
  }

  useEffect(()=>{ 
      socket.emit('join-room', {id:id, name:sessionStorage.getItem("name")});
  },[]);
  
  return (
    <div className="App" style={{display:'flex'}}>
      <DrawBoard socket={socket} size={5}></DrawBoard>
      <Chat socket={socket}></Chat>
    </div>
  );
}
