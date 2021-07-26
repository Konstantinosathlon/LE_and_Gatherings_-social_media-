import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth"
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBmTwGdmOZNsScxscDj2XLHPh-2MIsg-8s",
    authDomain: "my-socialmedia-app-4f4e7.firebaseapp.com",
    projectId: "my-socialmedia-app-4f4e7",
    storageBucket: "my-socialmedia-app-4f4e7.appspot.com",
    messagingSenderId: "1002518160082",
    appId: "1:1002518160082:web:aee6c7c83fdd210845030b"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;