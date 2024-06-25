import { useDispatch } from 'react-redux';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { setQuotesUsers } from '../redux/quotesUsersSlice';
import { setQuotesIdFav } from '../redux/quotesIdFavSlice';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setCurrUser } from '../redux/loginUserSlice';
import { quotesFetched } from '../redux/quotesSlise';
import { quotesFavFetched } from '../redux/quotesFavSlise';

export const useStorage = () => {
  const adminId = {
    userId: process.env.REACT_APP_FIREBASE_ADMIN_ID
  };
  const dispatch = useDispatch();

  const initUser = () => {
    onAuthStateChanged(auth, (getUser) => {
      if (getUser) {
        const user = {};
        user.email = getUser.email;
        user.displayName = getUser.displayName;
        user.photoURL = getUser.photoURL;
        user.uid = getUser.uid;
        dispatch(setCurrUser({currUser: user}));
      } else {
        dispatch(setCurrUser({currUser: null}));
      }
    });
  }

  const loadAppData = async () => {
    const querySnapshot = await getDocs(collection(db, "dataQuotes"));
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      let obj = doc.data();
      dataArr.push(obj);
    });
    return dataArr;
  }

  const loadIdQuotesFav = async () => {
    const querySnapshot = await getDoc(doc(db, "dataQuotes", "IdsFav"));
    return JSON.parse(querySnapshot.data().dataFav);
  }

  const loadQuotesUsers = async () => {
    const querySnapshot = await getDoc(doc(db, "dataQuotes", "quotesUsers"));
    return JSON.parse(querySnapshot.data().dataQuotesUsers);
  }

  const initAppData = (currUser) => {
    loadAppData()
      .then((data) => {
        console.log('Данные получены !');
        const quotesAll = [];
        const idFav = [];
        const quotesUsers = []
        data.forEach((obj) => {
          if (obj.dataQuotesApp) {
            quotesAll.push(...JSON.parse(obj.dataQuotesApp));
            dispatch(quotesFetched({quotes: quotesAll.reverse(), dataLoadStatus: 'loaded'}));
          }
          if (obj.dataFav) {
            idFav.push(...JSON.parse(obj.dataFav));
            dispatch(setQuotesIdFav({quotesIdFav: idFav}));
          }
          if (obj.dataQuotesUsers) {
            quotesUsers.push(...JSON.parse(obj.dataQuotesUsers))
            dispatch(setQuotesUsers({quotesUsers: quotesUsers}));
          }
        });
        return {quotesAll, idFav, quotesUsers};
      })
      .then(({quotesAll, idFav, quotesUsers}) => {
        if (currUser) {
          getFavQuotes(quotesAll, idFav, quotesUsers, currUser);
        }
      });
  }

  const getFavQuotes = (quotesAll, idFav, quotesUsers, user) => {
    const quotesFav = quotesAll.filter((quote) => {
      let isFav = false;
      idFav.forEach((item) => {
        if (quote.id === item.id) {
          isFav = item.usersArr.includes(user.uid);
        }
      });
      return isFav;
    });
    // console.log(quotesFav);
    const quotesUser = quotesUsers.filter(quote => quote.userAdded === user.uid || user?.uid === adminId.userId);
    dispatch(quotesFavFetched(({quotesFav: [...quotesUser, ...quotesFav]})));
  }

  const updateQuotesAll = async (data) => {
    const dataQuotesJson = JSON.stringify(data);
    const objQuotes = {};
    objQuotes.dataQuotesApp = dataQuotesJson;
    try {
      await setDoc(doc(db, "dataQuotes", 'quotesApp'), objQuotes);
      console.log('Данные загружены на сервер FIREBASE');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const updateQuotesIdFav = async (data) => {
    // console.log('dataQuotesIdFav', data);
    const dadaFavJson = JSON.stringify(data);
    const objFav = {};
    objFav.dataFav = dadaFavJson;
    try {
      await setDoc(doc(db, "dataQuotes", 'IdsFav'), objFav);
      console.log('Данные загружены на сервер FIREBASE');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const updateQuotesUser = async (quotesObj) => {
    const quotesObjJson = JSON.stringify(quotesObj);
    const objQuotesUser = {};
    objQuotesUser.dataQuotesUsers = quotesObjJson;
    try {
      await setDoc(doc(db, "dataQuotes", 'quotesUsers'), objQuotesUser);
      console.log('Данные загружены на сервер FIREBASE');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return {
    initUser,
    initAppData,
    loadIdQuotesFav,
    updateQuotesAll,
    updateQuotesIdFav,
    loadQuotesUsers,
    updateQuotesUser,
  };
}