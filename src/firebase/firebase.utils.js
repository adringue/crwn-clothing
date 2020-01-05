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

firebase.initializeApp(config);
export const auth=firebase.auth();
export const firestore=firebase.firestore();
const provider =new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle=()=> auth.signInWithPopup(provider);

export default firebase;
