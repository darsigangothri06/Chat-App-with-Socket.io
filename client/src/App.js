import { useEffect, useState } from 'react';
import io from "socket.io-client"
import './App.css';

let socket;
const CONNECTION_PORT = 'localhost:8000/';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [room, setRoom] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    socket = io(CONNECTION_PORT)
  }, [CONNECTION_PORT])

  const connectToRoom = () => {
    socket.emit('join_room', room)
  }
  return(
    <div className='App'>
      {!loggedIn ? 

        <div className="logIn">
          <div className="inputs">
              <input type="text" placeholder="Name..." onChange={(e) => {setUserName(e.target.value)}}></input>
              <input type="text" placeholder="Room..." onChange={(e) => {setRoom(e.target.value)}}></input>
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      
      : <h2>You are logged In</h2>}
    </div>
  )
}

export default App;
