import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyCtit7s3ZnbaWFhfKnG9ioh1OGUb-byBUE",
  authDomain: "oxygene-b057f.firebaseapp.com",
  projectId: "oxygene-b057f",
  storageBucket: "oxygene-b057f.appspot.com",
  messagingSenderId: "728992500342",
  appId: "1:728992500342:web:2107827d8c5a6f9a45ad57"
};
  // Initialize Firebase
 const fire= firebase.initializeApp(firebaseConfig);
 const storage = firebase.storage;
 export {storage,fire as default};