import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageMain from '../pages/PageMain';



export const PagesRouter = () => {

  return (
    <Routes>
      <Route path='/' element={<PageMain/>}/>
      <Route path='/pages' element={<PageMain/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  );
}