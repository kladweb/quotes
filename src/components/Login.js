import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';

function Login() {

  const [currUs, setCurrUs] = useState(null);

  const provider = new GoogleAuthProvider();
  let user = null;

  const loginGoogle = function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setCurrUs(auth.currentUser);
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
      setCurrUs(auth.currentUser);
    }).catch((error) => {
      // console.log('Sign-out error', user);
      // An error happened.
    });
  }

  console.log(currUs);
  

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