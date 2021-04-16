import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAZmQkQdfATMXo_G1dlCiJ9MVxiYCAygKQ",
    authDomain: "catatanapp.firebaseapp.com",
    databaseURL: "https://catatanapp.firebaseio.com",
    projectId: "catatanapp",
    storageBucket: "catatanapp.appspot.com",
    messagingSenderId: "1080628803695",
    appId: "1:1080628803695:web:e63601ab25353026fbf59a",
    measurementId: "G-RB16YL87H0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase