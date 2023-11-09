import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { PagesRouter } from './routes/PagesRouter';
import './App.css';
import { auth } from './firebase/firebase';
import { setCurrUser } from './redux/currUserSlice';
import { useStorage } from './firebase/storage';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const {readIdQuotesFav, readQuotesUsers} = useStorage();
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);

  useEffect(() => {
    onAuthStateChanged(auth, (getUser) => {
      if (getUser) {
        const user = {};
        user.email = getUser.email;
        user.displayName = getUser.displayName;
        user.photoURL = getUser.photoURL;
        user.uid = getUser.uid;
        dispatch(setCurrUser({currUser: user}));
        readIdQuotesFav();
        if (dataQuotesUsers.length === 0) {
          readQuotesUsers();
        }
      } else {
        dispatch(setCurrUser({currUser: null}));
      }
    });
  }, []);

  return (
    <div className="App bg-body-secondary pb-5">
      <BrowserRouter>
        <Header/>
        <PagesRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;