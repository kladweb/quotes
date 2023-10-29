import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function Login() {

  const provider = new GoogleAuthProvider();
  let user = null;

  const loginGoogle = function () {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
        console.log('user: ', user);
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
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Sign-out successful', user);
      // Sign-out successful.
    }).catch((error) => {
      console.log('Sign-out error', user);
      // An error happened.
    });
  }

  return (
    <Container>
      <Button
        variant="light"
        className='d-block text-info mt-5 fw-bold mx-auto'
        onClick={loginGoogle}
      >
        Войти при помощи аккаунта GOOGLE
      </Button>
      <Button
        variant="light"
        className='d-block text-info mt-5 fw-bold mx-auto'
        onClick={logoutGoogle}
      >
        Выйти из аккаунта
      </Button>
    </Container>
  );
}

export default Login;