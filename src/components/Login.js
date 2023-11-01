import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Container } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { setCurrUser } from '../redux/currUserSlice';


function Login() {
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.currUser.currUser);
  console.log('ddd', currUser);

  const provider = new GoogleAuthProvider();

  const loginGoogle = function () {

    // console.log("provider:", provider);
    // provider.arguments = {};

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        dispatch(setCurrUser({currUser: auth.currentUser}));
        // dispatch(setCurrUser(auth.currentUser));
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const logoutGoogle = function () {
    signOut(auth).then(() => {
      // console.log('Sign-out successful', auth.currentUser);
      // Sign-out successful.
      dispatch(setCurrUser({currUser: auth.currentUser}));
    }).catch((error) => {
      // console.log('Sign-out error', user);
      // An error happened.
    });
  }

  console.log(currUser);


  return (
    <Container className='text-center'>
      {
        (!currUser) ?
          <Button
            variant="light"
            className='d-inline-block text-info mt-5 fw-bold'
            onClick={loginGoogle}
          >
            Войти при помощи аккаунта GOOGLE
          </Button>
          :
          <Button
            variant="light"
            className='d-inline-block text-info mt-5 fw-bold'
            onClick={logoutGoogle}
          >
            Выйти из аккаунта
          </Button>
      }
    </Container>
  );
}

export default Login;