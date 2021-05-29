import Chat from './components/chat.js';
import {useParams, useHistory} from 'react-router-dom';

import {Get} from './serverContact.js';

export default function Lobby() {
  const {id} = useParams();
  const history = useHistory();

  if(!Get(id)){
    history.push('/');
  }
  
  return (
    <div className="App">
      <Chat></Chat>    
    </div>
  );
}
