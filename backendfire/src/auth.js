import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const trackUserSession = async (user) => {
  if (!user) return;

  const userRef = doc(db, "activeSessions", user.uid);
  const existingSession = await getDoc(userRef);

  if (existingSession.exists()) {
    alert("This account is already logged in on another device!");
    return;
  }

  await setDoc(userRef, { sessionActive: true });
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
