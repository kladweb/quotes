import Login from '../components/Login';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Quotes from '../components/Quotes';
import Quote from '../components/Quote';


function PageAdminQuotes() {
  const navigate = useNavigate();
  const currUser = useSelector(state => state.currUser.currUser);
  const idCurrUser = useSelector(state => state.currUser.idCurrUser);
  const adminId = {
    userId: process.env.REACT_APP_FIREBASE_ADMIN_ID
  };

  useEffect(() => {
    // console.log(idCurrUser);
    // console.log(adminId.userId);
    if (currUser !== 0 && idCurrUser !== adminId.userId) {
      navigate('/');
    }
  }, [currUser]);

  return (
    <div className="App bg-body-secondary">
      <Quotes isAdmin={true} favorite={true}/>
    </div>
  );
}

export default PageAdminQuotes;