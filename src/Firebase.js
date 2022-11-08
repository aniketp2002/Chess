import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvi3u9RJkHjH552yrkKjJoFj7hhWyVyFc",
  authDomain: "chessmaster-70aba.firebaseapp.com",
  projectId: "chessmaster-70aba",
  storageBucket: "chessmaster-70aba.appspot.com",
  messagingSenderId: "940229835667",
  appId: "1:940229835667:web:c93d3f7a63b1e74c980666",
  measurementId: "G-L8D38ZG8CX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
export default db; 


