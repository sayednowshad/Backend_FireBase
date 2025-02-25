import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "./firebase";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // ✅ Import Navigate
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Explore from "./Components/Explore";

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user); // ✅ Set the user state correctly
      setLoading(false);
    });
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
      <Navbar auth={auth} />
      <Routes>
        {/* ✅ If user is logged in, redirect to Home */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/explore" element={user ? <Explore /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/signin" element={!user ? <Signin /> : <Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
