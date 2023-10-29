import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageMain from '../pages/PageMain';
import PageLogin from '../pages/PageLogin';


export const PagesRouter = () => {
  const user = false;
  return (
    <Routes>
      <Route path='/' element={<PageMain/>}/>
      <Route path='/login' element={<PageLogin/>}/>

      {
        (user) ?
          <Route path='/myquotes' element={<PageMain/>}/>
          :
          <Route path='*' element={<PageLogin/>}/>
      }
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  );
}