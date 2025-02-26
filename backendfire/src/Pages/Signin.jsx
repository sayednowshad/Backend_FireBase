import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase";

const auth = getAuth(app);
const db = getFirestore(app);

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SigninPage = async () => {
    try {
      // Attempt to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "activeSessions", user.uid);

      // Check if user is already logged in
      const sessionSnap = await getDoc(userRef);
      if (sessionSnap.exists()) {
        alert("This account is already logged in on another device!");
        return;
      }

      // Store session in Firestore
      await setDoc(userRef, { sessionActive: true });

      alert("Signin Success!");
    } catch (err) {
      alert("Invalid Credentials or Please Sign Up");
    }
  };

  return (
    <div className="Sign-in" style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
      <label style={{ color: "white" }}>Enter Your Email:</label>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter Your Email" />

      <label style={{ color: "white" }}>Enter The Password:</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter the password" />

      <button
        onClick={SigninPage}
        style={{
          margin: "20px",
          padding: "10px",
          width: "100px",
          marginLeft: "50px",
          borderRadius: "5px",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Signin;
