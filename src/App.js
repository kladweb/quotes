import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PagesRouter } from './routes/PagesRouter';
import './App.css';
import Header from './components/Header';

function App() {

  console.log('APP');
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