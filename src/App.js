import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat'

const socket = io.connect("https://vungel-chat-backend-socket-io.herokuapp.com")

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
    if(username !== "" && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Vungel Chat</h3>
        <input type='text' placeholder=' your username:' onChange={(e)=>{setUsername(e.target.value)}} />
        <input type='text' placeholder=' Room ID:' onChange={(e)=>{setRoom(e.target.value)}} />
        <button onClick={joinRoom}>Conectar</button>
      </div>
      ) :

      ( <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
