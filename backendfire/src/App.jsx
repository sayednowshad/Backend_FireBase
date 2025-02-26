import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import { useEffect, useState } from "react";
import { handleLogout } from "./auth"; // Import logout function
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Navbar from "./Components/Navbar";
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
    return <p>Loading, please wait...</p>;
  }

  return (
    <Router>
      {user && <Navbar auth={auth} onLogout={handleLogout} />} {/* Logout removes session */}

      <Routes>
        {!user ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </>
        ) : (
          <>
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
