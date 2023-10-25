import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './routes/PagesRouter';

import './App.css';
import Quotes from "./components/Quotes";
import Header from "./components/Header";

function App() {

  // const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App bg-body-secondary pb-5">
      <BrowserRouter>
        <PagesRouter/>
        {/*<Header isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>*/}
        {/*<Quotes isAdmin={isAdmin}/>*/}
      </BrowserRouter>
    </div>
  );
}

export default App;