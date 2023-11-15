import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PagesRouter } from './routes/PagesRouter';
import './App.scss';
import Header from './components/Header';

function App() {

  return (
      <BrowserRouter>
        <Header/>
        <PagesRouter/>
      </BrowserRouter>
  );
}

export default App;