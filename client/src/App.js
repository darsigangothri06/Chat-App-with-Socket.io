import { useEffect, useState } from 'react';
import io from "socket.io-client"
import './App.css';

let socket;
const CONNECTION_PORT = 'localhost:8000/';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  // before login
  const [room, setRoom] = useState('')
  const [userName, setUserName] = useState('')
  
  // after login
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket = io(CONNECTION_PORT)
  }, [CONNECTION_PORT])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList([...messageList, data])
    })
  })

  const connectToRoom = () => {
    setLoggedIn(true)
    socket.emit('join_room', room)
  }

  const sendMessage = async () => {
    let msgContent = {
      room: room,
      content: {
        author: userName,
        message: message
      }
    }
    // we are emitting a broadcast for the socket which has the name of sendMessage
    // individually sending messages to our own list
    await socket.emit('send_message', msgContent)
    setMessageList([...messageList, msgContent.content])
    setMessage("")
  }
  return(
    <div className='App'>
      <h1 className='hedding'>Live Box {loggedIn ? '- ' + room : ''}</h1>
      {!loggedIn ? 

        <div className="logIn">
          <div className="inputs">
              <input type="text" placeholder="Name..." onChange={(e) => {setUserName(e.target.value)}}></input>
              <input type="text" placeholder="Room..." onChange={(e) => {setRoom(e.target.value)}}></input>
          </div>
          <button onClick={connectToRoom} type='submit'>Enter Chat</button>
        </div>
      
      : (
        <div className='chatContainer'>
          <div className='messages'>
            {messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.author == userName ? "You" : "Other"}
                  >
                    <div className="messageIndividual">
                      {val.author}: {val.message}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className='messageInputs'>
            <input 
              type='text' 
              placeholder='Enter your message here...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage} type='submit'>Send</button>
          </div>
        </div>
      )}

      <h3 className='footer'>Developed by Gangothri Darsi</h3>
    </div>
  )
}

export default App;
