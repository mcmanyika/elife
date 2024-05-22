// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDBX-mSoWLV523ZHzAy4oSgWK_iu5P72ns",
  authDomain: "insurance-1573c.firebaseapp.com",
  databaseUrl: "https://insurance-1573c-default-rtdb.firebaseio.com/",
  projectId: "insurance-1573c",
  storageBucket: "insurance-1573c.appspot.com",
  messagingSenderId: "947234088295",
  appId: "1:947234088295:web:bd4361db2b9c3b09707bc2",
  measurementId: "G-V7MY4Z0BRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const storage = getStorage(app);

export { database, storage };