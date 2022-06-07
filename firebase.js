import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBTEVwvoUgtaDF1AoHq2F9CvzKqGqYhpVk",
    authDomain: "instagram-clone-55673.firebaseapp.com",
    projectId: "instagram-clone-55673",
    storageBucket: "instagram-clone-55673.appspot.com",
    messagingSenderId: "789074048382",
    appId: "1:789074048382:web:41c969da0ca095307aef2f",
    measurementId: "G-GS9SGHZ4FB"
};



const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const app=!getApps().length?initializeApp(firebaseConfig):getApp()
const storage = getStorage();
export { app, db, storage };