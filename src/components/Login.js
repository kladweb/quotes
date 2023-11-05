import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { setCurrUser } from '../redux/currUserSlice';
import { auth } from '../firebase/firebase';
import Spinner from 'react-bootstrap/Spinner';


function Login() {
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.currUser.currUser);
  const provider = new GoogleAuthProvider();

  const loginGoogle = function () {

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const getUser = auth.currentUser;
        // console.log(getUser);
        const user = {};
        user.email = getUser.email;
        user.displayName = getUser.displayName;
        user.photoURL = getUser.photoURL;
        user.uid = getUser.uid;

        dispatch(setCurrUser({currUser: user}));
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

  return (
    <Container className='text-center'>
      {
        (!currUser) ?
          (currUser === 0) ?
            <div className="d-inline-block text-info mt-5 fw-bold">
              <Spinner animation="border" variant="info"/>
            </div>
            :
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