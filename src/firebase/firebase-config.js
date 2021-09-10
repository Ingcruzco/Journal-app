import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDhM5u84pgH903ku81FySRus4QMe46wrtc",
    authDomain: "journal-app-2174c.firebaseapp.com",
    projectId: "journal-app-2174c",
    storageBucket: "journal-app-2174c.appspot.com",
    messagingSenderId: "857321650178",
    appId: "1:857321650178:web:d7d0cb5bb832104c688f1b",
    measurementId: "G-BMFB42E9WV"
  };

  firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore();
  const googleAppProvider=new firebase.auth.GoogleAuthProvider();

  export {
    db,
    googleAppProvider,
    firebase,
  }