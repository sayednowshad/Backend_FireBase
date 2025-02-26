import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

// Track user session
const trackUserSession = async (user) => {
  if (!user) return;

  const userRef = doc(db, "activeSessions", user.uid);
  const existingSession = await getDoc(userRef);

  if (existingSession.exists()) {
    // If a session exists, log out the new login instantly
    await signOut(auth);
    alert("This account is already logged in on another device!");
    window.location.href = "/signin";  // 🔥 Instant Redirect
    return;
  }

  // Save session for the logged-in user
  await setDoc(userRef, { sessionActive: true });
};

// Run session tracking on auth state change
onAuthStateChanged(auth, (user) => {
  trackUserSession(user);
});

// Logout function (removes session & signs out)
const handleLogout = async () => {
  if (auth.currentUser) {
    await deleteDoc(doc(db, "activeSessions", auth.currentUser.uid));
    await signOut(auth);
    window.location.href = "/signin";  // 🔥 Instant Redirect
  }
};

export { handleLogout };
