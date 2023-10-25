import { useState } from 'react';

import Header from '../components/Header';
import Quotes from '../components/Quotes';


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