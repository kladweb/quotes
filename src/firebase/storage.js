import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { setQuotesUsers } from '../redux/quotesUsersSlice';
import { setQuotesIdFav } from '../redux/quotesIdFavSlice';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setCurrUser } from '../redux/loginUserSlice';
import { quotesFetched } from '../redux/quotesSlise';

export const useStorage = () => {
  const dispatch = useDispatch();
  const idCurrUser = useSelector(state => state.currUser.idCurrUser);
  const dataQuotesIdFav = useSelector(state => state.quotesIdFav.quotesIdFav);
  const dataQuotes = useSelector(state => state.quotes.quotes);

  const initUser = () => {
    onAuthStateChanged(auth, (getUser) => {
      if (getUser) {
        // console.log(getUser);
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

  const initAppData = () => {
    loadAppData()
      .then((data) => {
        console.log('Данные получены !');
        data.forEach((obj) => {
          if (obj.dataQuotesApp) {
            dispatch(quotesFetched({quotes: JSON.parse(obj.dataQuotesApp), dataLoadStatus: 'loaded'}));
          }
          if (obj.dataFav) {
            dispatch(setQuotesIdFav({quotesIdFav: JSON.parse(obj.dataFav)}));
          }
          if (obj.dataQuotesUsers) {
            dispatch(setQuotesUsers({quotesUsers: JSON.parse(obj.dataQuotesUsers)}));
          }
        });
      });
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

  const changeFavQuote = (quote, dataQuotesIdFavCurrent, action) => {

  }

  const addFavQuote = (quote, dataQuotesIdFavCurrent, isAdmin) => {
    const idAddedUser = (isAdmin) ? quote.userAdded : idCurrUser;
    let dataQuotesIdFavNew = [];
    let addQuote = true;
    dataQuotesIdFavNew = dataQuotesIdFavCurrent.map((item) => {
      const newItem = {};
      newItem.id = item.id;
      if (item.userAdded) {
        newItem.userAdded = item.userAdded;
      }
      if (item.userName) {
        newItem.userName = item.userName;
      }
      newItem.usersArr = [];
      if (item.usersArr) {
        newItem.usersArr = [...item.usersArr];
      }
      if (newItem.id === quote.id) {
        if (!newItem.usersArr.includes(idAddedUser)) {
          (newItem.usersArr).push(idAddedUser);
          addQuote = false;
        }
      }
      return newItem;
    });
    if (addQuote || dataQuotesIdFavNew.length === 0) {
      const newObj = {};
      newObj.id = quote.id;
      newObj.usersArr = [idAddedUser];
      dataQuotesIdFavNew.push(newObj);
    }
    dispatch(setQuotesIdFav({quotesIdFav: dataQuotesIdFavNew}));
    updateQuotesIdFav(dataQuotesIdFavNew)
      .then(() => {
        console.log('Данные на сервере изменены');
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  const removeFavQuote = (quote, dataQuotesIdFavCurrent) => {
    const dataQuotesIdFavNew = [];
    dataQuotesIdFavCurrent.forEach((item) => {
      const newItem = {};
      newItem.id = item.id;
      newItem.usersArr = [];
      if (item.usersArr) {
        newItem.usersArr = [...item.usersArr];
      }
      if (newItem.id === quote.id) {
        if (item.usersArr.includes(idCurrUser)) {
          let i = newItem.usersArr.indexOf(idCurrUser);
          newItem.usersArr.splice(i, 1);
        }
      }
      if (newItem.usersArr.length !== 0) {
        dataQuotesIdFavNew.push(newItem);
      }
    });
    dispatch(setQuotesIdFav({quotesIdFav: dataQuotesIdFavNew}));
    updateQuotesIdFav(dataQuotesIdFavNew)
      .then(() => {
        console.log('Данные на сервере изменены');
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  return {
    initUser,
    initAppData,
    loadIdQuotesFav,
    updateQuotesAll,
    updateQuotesIdFav,
    loadQuotesUsers,
    updateQuotesUser,
    addFavQuote,
    removeFavQuote,
  };
}