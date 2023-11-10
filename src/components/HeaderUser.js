import React, { useEffect } from 'react';
import { useStorage } from '../firebase/storage';

function HeaderUser() {
  const {initUser} = useStorage();

  useEffect(() => {
    initUser();
  }, []);

  console.log('HEADER-USER');
  return (
    <div></div>
  );
}

export default HeaderUser;