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

    firebase.initializeApp(config);


  export const createUserProfileDocument =async ( userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)

      const snapShot = await userRef.get();

      if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch (error){
          console.log('error creating user', error.message);
      }
      } 

      return userRef;
  };

  export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => { const {title, items} = doc.data();
  
  return {
    routeName: encodeURI(title.toLowerCase()),
    id: doc.id,
    title,
    items
  }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});

  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () =>auth.signInWithPopup(googleProvider);

  export default firebase;