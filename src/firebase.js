import firebase from 'firebase/app'

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/functions");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA__MzBA8L3WLD_EMrbOcMAvJzsR2t0nmQ",
    authDomain: "santiago-cine.firebaseapp.com",
    databaseURL: "https://santiago-cine.firebaseio.com",
    projectId: "santiago-cine",
    storageBucket: "santiago-cine.appspot.com",
    messagingSenderId: "937594923048"
};

firebase.initializeApp(config);
// firebase.firestore().settings({
//     timestampsInSnapshots: true
// }) Esta configuracion ya no es necesaria

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export {
    firebase,
    auth,
    db,
    storage,
    functions
}
