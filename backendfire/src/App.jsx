import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "./firebase";
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import React Router
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
      setUser(user); // ✅ Fix: Correct way to set user state
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

  if (!user) {
    return (
      <>
        <Signup />
        <Signin />
      </>
    );
  }

  return (
    <Router> {/* ✅ Wrap the entire app inside Router */}
      <Navbar auth={auth} />
      <Routes>
        <Route path="/home" element={<Home />} /> {/* ✅ Home Route */}
        <Route path="/explore" element={<Explore />} /> {/* ✅ Explore Route */}
      </Routes>
    </Router>
  );
};

export default App;
