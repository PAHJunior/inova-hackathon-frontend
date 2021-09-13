import { boot } from 'quasar/wrappers'
// Import the functions you need from the SDKs you need
import { initializeApp, Firebase } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFH61XhgeWw49bfFK15Z6Zo0WmBozdjcU",
  authDomain: "inova-plus-hackathon-2021.firebaseapp.com",
  projectId: "inova-plus-hackathon-2021",
  storageBucket: "inova-plus-hackathon-2021.appspot.com",
  messagingSenderId: "691764398101",
  appId: "1:691764398101:web:f6329b7408920aac7ae61c",
  measurementId: "G-WM708XTSM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
