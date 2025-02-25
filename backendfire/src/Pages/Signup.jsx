import React, {useState} from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {app} from '../firebase';

const auth = getAuth(app);

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = () =>{

        createUserWithEmailAndPassword(auth , email , password).then(value => 
        alert("Success"));
    }

  return (
    <> 

    <div className="signup-page" style={{marginBottom : "20px"}}> 

      <h1> Signup Page </h1>

    <label> Email </label>
        <input onChange={(e) => setEmail(e.target.value)}
        value={email} 
        type="email" required
        placeholder='Enter Your email here'/>

    <label> Password </label>
        <input onChange={(e) => setPassword(e.target.value)} 
        value={password}
        type="password"
        required placeholder='Enter Your password here'/>
    
    <button onClick={createUser}> Sign Up </button> 

    </div>
    </>
  )
}

export default Signup;