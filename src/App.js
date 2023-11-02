import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './routes/PagesRouter';

import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { setCurrUser } from './redux/currUserSlice';


function App() {

  const dispatch = useDispatch();
  onAuthStateChanged(auth, (getUser) => {
    if (getUser) {

      const user = {};
      user.email = getUser.email;
      user.displayName = getUser.displayName;
      user.photoURL = getUser.photoURL;
      user.uid = getUser.uid;
      dispatch(setCurrUser({currUser: user}));
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  // const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App bg-body-secondary pb-5">
      <BrowserRouter>
        <PagesRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;