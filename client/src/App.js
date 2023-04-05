import { useState } from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return(
    <div className='App'>
      {!loggedIn ? <Login/> : <h2>You are logged In</h2>}
    </div>
  )
}

export default App;
