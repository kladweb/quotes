import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Image } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { setCurrUser } from '../redux/loginUserSlice';
import { auth } from '../firebase/firebase';
import Spinner from 'react-bootstrap/Spinner';
import './login.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currUser = useSelector(state => state.currUser.currUser);
  const provider = new GoogleAuthProvider();

  const loginGoogle = function () {

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const getUser = auth.currentUser;
        const user = {};
        user.email = getUser.email;
        user.displayName = getUser.displayName;
        user.photoURL = getUser.photoURL;
        user.uid = getUser.uid;
        dispatch(setCurrUser({currUser: user}));
        setTimeout(() => {
          navigate('/main');
        }, 1500);

      }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
  }

  const logoutGoogle = function () {
    signOut(auth).then(() => {
      console.log('Sign-out successful', auth.currentUser);
      dispatch(setCurrUser({currUser: auth.currentUser}));
    }).catch((error) => {
      console.log('Sign-out error', error);
    });
  }
  // currUser = 0;

  return (
    <Container className='text-center'>
      {
        (!currUser) ?
          (currUser === 0) ?
            <div className='mt-4 pt-5'>
              <Spinner animation="border" variant="info"/>
            </div>
            :
            <Button
              variant="light"
              className='d-inline-block text-info mt-4 fw-bold login-btn'
              onClick={loginGoogle}
              style={{transform: 'translateY(50px)'}}
            >
              {/*<img src="/img/google_icon.png" alt="google"/>*/}
              <Image src='/img/google_icon.png' className='me-3'/>
              Войти при помощи аккаунта GOOGLE
            </Button>
          :
          <Button
            variant="light"
            className='d-inline-block text-info mt-4 fw-bold login-btn'
            onClick={logoutGoogle}
            style={{transform: 'translateY(50px)'}}
          >
            Выйти из аккаунта
            <Image src='/img/google_icon.png' className='ms-3'/>
          </Button>
      }
    </Container>
  );
}

export default Login;