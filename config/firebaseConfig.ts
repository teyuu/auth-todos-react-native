// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApY94ycypKPd_fhbeLEbKzk98g7dfx8ps",
  authDomain: "todos-rn-b2cfa.firebaseapp.com",
  projectId: "todos-rn-b2cfa",
  storageBucket: "todos-rn-b2cfa.firebasestorage.app",
  messagingSenderId: "768234361237",
  appId: "1:768234361237:web:f5eef390e2dbd143bb669c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const FIREBASE_DB = getFirestore(app); 