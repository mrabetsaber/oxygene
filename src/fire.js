import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAqBERurSD-zbZXbdMOwQaajai92pBhcgU",
    authDomain: "oxygene-b7763.firebaseapp.com",
    projectId: "oxygene-b7763",
    storageBucket: "oxygene-b7763.appspot.com",
    messagingSenderId: "400341398086",
    appId: "1:400341398086:web:2c0c85d4bd484dc96c9047"
  };
  // Initialize Firebase
 const fire= firebase.initializeApp(firebaseConfig);
 const storage = firebase.storage;
 export {storage,fire as default};