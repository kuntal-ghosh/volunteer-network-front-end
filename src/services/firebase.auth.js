// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "../firebase.config";

var provider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

firebase.initializeApp(firebaseConfig);

function signupwithEmailPassword(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      // ...
      return error;
    });
}

function signinWithEmailPassword(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
  // .catch(function (error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });
}

function signinWithGoogle() {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...

      return result;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      throw error;
    });
}

function signout() {
  return firebase
    .auth()
    .signOut()
    .then(function (response) {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
      throw error;
    });
}

function signinWithFacebook() {
  return firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      return user;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      throw error;
    });
}

export {
  signupwithEmailPassword,
  signinWithEmailPassword,
  signinWithGoogle,
  signout,
  signinWithFacebook,
};
