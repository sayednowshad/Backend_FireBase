import React, {useState} from 'react'
import {getAuth , signInWithEmailAndPassword} from "firebase/auth";
import {app} from "../firebase";

const auth = getAuth(app);

const Signin = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const SigninPage = () =>{

        signInWithEmailAndPassword(auth , email , password)
        .then((value) => alert("Signin Success"))
        .catch((err) => console.log(err));

    }

  return (

    <>
    
    <div className="Sign-in" style={{display :"flex" , flexDirection : "column" , maxWidth : "300px"}}>

    <label > Enter Your Email: </label>
    <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" required placeholder='Enter Your Email' />

    <label> Enter The Password:</label>
    <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" required placeholder='Enter the password' />

    <button onClick={SigninPage} style={
        {
            margin : "20px",
            padding : "10px",
            width : "100px",
            marginLeft : "50px",
            borderRadius : "5px",
            // border : "none"
        }
    }> Login </button>

    </div>
        
    </>

  )
}

export default Signin;