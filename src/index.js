import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require('firebase/firestore');


const firebaseConfig = {
    apiKey: "AIzaSyDkhz959A1e9-xST4z6nxi_GKdCKZzansc",
    authDomain: "nevernote-d851f.firebaseapp.com",
    databaseURL: "https://nevernote-d851f.firebaseio.com",
    projectId: "nevernote-d851f",
    storageBucket: "nevernote-d851f.appspot.com",
    messagingSenderId: "435283328945",
    appId: "1:435283328945:web:8ac974254a60ed9d914790"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('nevernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
