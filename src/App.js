import { useState } from 'react';

import './App.css';
import Quotes from "./components/Quotes";
import Header from "./components/Header";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  return (
      <div className="App bg-body-secondary pb-5 ">
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
        <Quotes isAdmin={isAdmin}/>
      </div>
  );
}

export default App;