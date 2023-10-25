import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function authGoogle() {

  const providerAuth = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, providerAuth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

export default authGoogle;
