// Suggested code may be subject to a license. Learn more: ~LicenseLog:4004561286.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:4190476402.
//import { auth } from "firebase-admin";
import { initializeApp } from "firebase/app";
import { signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwY0QM8UO9QsYhBKQc9IAeLE7iu4KBKqQ",
  authDomain: "stlist-4402f.firebaseapp.com",
  databaseURL: "https://stlist-4402f.firebaseio.com",
  projectId: "stlist-4402f",
  storageBucket: "stlist-4402f.appspot.com",
  messagingSenderId: "955361731943",
  appId: "1:955361731943:web:c677216bc1e4bc5c767bc2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
//const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const idToken = await userCredential.user.getIdToken();
  console.log(idToken);
  const res = await fetch("/api/auth/signin", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (res.redirected) {
    window.location.assign(res.url);
  }
};

export { auth, signInWithGoogle, onAuthStateChanged };