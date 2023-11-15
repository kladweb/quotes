import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageMain from '../pages/PageMain';
import PageLogin from '../pages/PageLogin';
import PageFavQuotes from '../pages/PageFavQuotes';
import PageAdminQuotes from '../pages/PageAdminQuotes';

export const PagesRouter = () => {
  const user = false;
  return (
    <Routes>
      <Route path='/' element={<PageMain/>}/>
      <Route path='/login' element={<PageLogin/>}/>
      <Route path='/myquotes' element={<PageFavQuotes/>}/>
      <Route path='/adminpage' element={<PageAdminQuotes/>}/>
      {/*<Route path='*' element={<PageMain/>}/>*/}
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  );
}