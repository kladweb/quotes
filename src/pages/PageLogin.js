import { useState } from 'react';

import Header from '../components/Header';
import Login from '../components/Login';


function PageLogin() {

  return (
    <div className="App bg-body-secondary pb-5 ">
      <Header/>
      <Login/>
    </div>
  );
}

export default PageLogin;