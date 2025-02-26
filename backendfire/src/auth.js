import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

const auth = getAuth(); 
const db = getFirestore();

const trackUserSession = async (user) => {
  if (!user) return;

  const userRef = doc(db, "activeSessions", user.uid);
  const sessionId = Math.random().toString(36).substring(2);

  const existingSession = await getDoc(userRef);

  if (existingSession.exists()) {
    
    signOut(auth);
    alert("You are already logged in from another device!");
  } else {
    
    await setDoc(userRef, { sessionId });
  }
};

onAuthStateChanged(auth, (user) => {
  trackUserSession(user);
});

const handleLogout = async () => {
  if (auth.currentUser) {
    await deleteDoc(doc(db, "activeSessions", auth.currentUser.uid));
    await signOut(auth);
  }
};

export { handleLogout };
