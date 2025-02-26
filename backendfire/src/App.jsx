import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "./firebase";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Explore from "./Components/Explore";
import Home from "./Components/Home";
import About from "./Components/About";

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  if (loading) {

    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading, please wait...</p>
      </div>

    );
  }

  return (

    <Router>
      
      {user ? <Navbar auth={auth} /> : null}

      <Routes>

        {/* Show Signup & Signin when user is NOT logged in */}

        {!user ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </>
        ) : (
          <>

            {/* Protected Routes: Only logged-in users can access */}

            <Route path="/explore" element={<Explore />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/home" replace />} />

          </>

        )}
      </Routes>
    </Router>
  );
};

export default App; 
