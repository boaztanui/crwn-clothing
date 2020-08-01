import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDjEJ4uhkcr5mL-7cJS_mAUYN68UYF2t4E",
    authDomain: "crwn-clothing-dp.firebaseapp.com",
    databaseURL: "https://crwn-clothing-dp.firebaseio.com",
    projectId: "crwn-clothing-dp",
    storageBucket: "crwn-clothing-dp.appspot.com",
    messagingSenderId: "483653397767",
    appId: "1:483653397767:web:873c9bc25684f675baa9a2",
    measurementId: "G-KMMPYPHNKF"
  };

  export const createUserProfileDocument =async ( userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)

      const snapShot = await userRef.get();

      if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                ...additionalData
            })
        }catch (error){
          console.log('error creating user', error.message);
      }
      } 

      return userRef;
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;