import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAREywf5sW2iDwLF4m6EXiisG_vnpAY66w",
  authDomain: "sayedu-1951.firebaseapp.com",
  projectId: "sayedu-1951",
  storageBucket: "sayedu-1951.firebasestorage.app",
  messagingSenderId: "131520810167",
  appId: "1:131520810167:web:4a54ac0e38f75a3b3ad132",
  databaseURL: "https://sayedu-1951-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);