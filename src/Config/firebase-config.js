  
import firebase from 'firebase/app';
import 'firebase/storage';
 
 var config = {
    apiKey: "AIzaSyDFl6ynGkS52YxogzS3OEV_uGQWc4lUJEY",
    authDomain: "share-verse-images.firebaseapp.com",
    projectId: "share-verse-images",
    storageBucket: "share-verse-images.appspot.com",
    messagingSenderId: "1064386255178",
    appId: "1:1064386255178:web:97dddd405b8b53e65309b3",
    measurementId: "G-TRW260JBMS"
  };

  firebase.initializeApp(config);

  var storage = firebase.storage();
  
  export {
      storage, firebase as default
  };