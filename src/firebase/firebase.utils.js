import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA75CmUv7N1Za2FbafFhwTHWsclGc-PpkA",
    authDomain: "crwn-db-45def.firebaseapp.com",
    databaseURL: "https://crwn-db-45def.firebaseio.com",
    projectId: "crwn-db-45def",
    storageBucket: "crwn-db-45def.appspot.com",
    messagingSenderId: "182931541064",
    appId: "1:182931541064:web:210a0fcbbd750144a6dc7d",
    measurementId: "G-PZM6ZRLYL1"
}

export const  createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    // const userRef=firestore.doc('users/LMglFRtdYnpvQ7GIxY3l');
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    // console.log(snapShot);
    if (!snapShot.exists) {
        console.log('auth:', userAuth);
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });

        } catch (error) {
            console.log('error creating user', error.message);

        }
    }
    return userRef;
};


export const  addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
   return await  batch.commit(); // returning a promise
};

export const convertCollectionsSnapshotToMap=(collections)=>{
    const transformedCollection= collections.docs.map(doc=>{
        const {title,items}=doc.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator,collection)=>{

        accumulator[collection.title.toLowerCase()]=collection;
        return accumulator;
    },{});
}


firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
