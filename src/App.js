import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './routes/PagesRouter';

import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { setCurrUser } from './redux/currUserSlice';


function App() {

  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
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