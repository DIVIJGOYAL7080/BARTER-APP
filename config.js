import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyC9kETFZab11WHjZPQho7a2ZOj0D0WEezg",
  authDomain: "barterapp-74470.firebaseapp.com",
  projectId: "barterapp-74470",
  storageBucket: "barterapp-74470.appspot.com",
  messagingSenderId: "157802501370",
  appId: "1:157802501370:web:f923e9efc8c0f29d3da543"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
