import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase";

const auth = getAuth(app);
const db = getFirestore(app);

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const SigninPage = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "activeSessions", email);
      const sessionSnap = await getDoc(userRef);

      if (sessionSnap.exists()) {
        alert("This account is already logged in on another device!");
        setLoading(false);
        return;
      }

      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save session in Firestore
      await setDoc(doc(db, "activeSessions", user.uid), { sessionActive: true });

      alert("Signin Success!");
      window.location.href = "/home"; // 🔥 Redirect to Home after Login
    } catch (err) {
      alert("Invalid Email or Password. Please Sign Up.");
    }
    setLoading(false);
  };

  return (
    <div className="Sign-in" style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
      <label style={{ color: "white" }}>Enter Your Email:</label>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter Your Email" />

      <label style={{ color: "white" }}>Enter The Password:</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter the password" />

      <button
        onClick={SigninPage}
        disabled={loading}
        style={{
          margin: "20px",
          padding: "10px",
          width: "100px",
          marginLeft: "50px",
          borderRadius: "5px",
          backgroundColor: loading ? "#999" : "#007bff",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Signin;
