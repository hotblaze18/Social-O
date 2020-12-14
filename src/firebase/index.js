// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDV2gKMedNYa2bERIygjLV1gLjdOe4otfE",
    authDomain: "social-o-509d0.firebaseapp.com",
    projectId: "social-o-509d0",
    storageBucket: "social-o-509d0.appspot.com",
    messagingSenderId: "270373626061",
    appId: "1:270373626061:web:fa3d48543db1d7be5a8984"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  //update firestore settings
  db.settings({timesStampsInSnapshots: true})

  export {auth, db};