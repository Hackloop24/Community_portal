
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyBzvP2Ob1fFJPLJw5TBcA-deC87uZccq4I",
  authDomain: "quora-clone-155a1.firebaseapp.com",
  projectId: "quora-clone-155a1",
  storageBucket: "quora-clone-155a1.firebasestorage.app",
  messagingSenderId: "145177042394",
  appId: "1:145177042394:web:ee45f69aa52bfac1cef4e3"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const authProvider =new GoogleAuthProvider();