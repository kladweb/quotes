import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, limit, query, setDoc, getDoc, where, getDocs } from 'firebase/firestore';
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
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);

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

  const changeFavQuotes = (quote, action) => {
    const newQuotes = [...dataQuotesUsers];
    let numActiveQuote = 0;
    newQuotes.forEach((v, index) => {
      if (v.id === quote.id) {
        numActiveQuote = index;
      }
    })
    switch (action) {
      case 'delete':
        newQuotes.splice(numActiveQuote, 1);
        break;
      case 'edit':
        newQuotes.splice(numActiveQuote, 1, quote);
        break;
      case 'add':
        newQuotes.push(quote);
        break;
    }
    updateQuotesUser(newQuotes)
      .then(() => {
        dispatch(setQuotesUsers({quotesUsers: newQuotes}));
        console.log('Данные загружены на сервер FIREBASE');
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
    // dispatch(quotesFetched({quotes: newQuotes, dataLoadStatus: 'loaded'}));
    // saveQuotes(newQuotes)
    //   .then(() => {
    //     console.log('Successfully saved');
    //   })
    //   .catch(() => {
    //     console.log('Saving error');
    //   });
  }


  const loadIdQuotesFav = async () => {
    const querySnapshot = await getDoc(doc(db, "dataQuotes", "IdsFav"));
    const IdQuotesFav = JSON.parse(querySnapshot.data().dataFav);
    // console.log('IdQuotesFav ', IdQuotesFav);
    dispatch(setQuotesIdFav({quotesIdFav: IdQuotesFav}));
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

  const loadQuotesUsers = async () => {
    const querySnapshot = await getDoc(doc(db, "dataQuotes", "quotesUsers"));
    const querySnapshotData = querySnapshot.data();
    // console.log('1', querySnapshotData);
    let quotesUsersBase = null;
    if (querySnapshotData) {
      quotesUsersBase = querySnapshotData.dataQuotesUsers;
    }
    // console.log('2', quotesUsersBase);
    let quotesUsers = null;
    if (quotesUsersBase) {
      quotesUsers = JSON.parse(quotesUsersBase);
      dispatch(setQuotesUsers({quotesUsers: quotesUsers}));
    }
    // console.log(quotesUsers);
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

  const addFavQuote = (quote) => {
    let addQuote = false;
    const dataQuotesIdFavNew = dataQuotesIdFav.map((item) => {
      const newItem = {};
      newItem.id = item.id;
      newItem.usersArr = [];
      if (item.usersArr) {
        newItem.usersArr = [...item.usersArr];
      }
      if (newItem.id && newItem.id === quote.id) {
        if (!newItem.usersArr.includes(idCurrUser)) {
          newItem.usersArr.push(idCurrUser);
          console.log('PUSH');
          addQuote = true;
        }
      }
      return newItem;
    });
    if (!addQuote) {
      const newObj = {};
      newObj.id = quote.id;
      newObj.usersArr = [idCurrUser];
      dataQuotesIdFavNew.push(newObj);
    }
    dispatch(setQuotesIdFav({quotesIdFav: dataQuotesIdFavNew}));
    updateQuotesIdFav(dataQuotesIdFavNew);
  }

  const removeFavQuote = (quote) => {
    const dataQuotesIdFavNew = dataQuotesIdFav.map((item) => {
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
      return newItem;
    });
    dispatch(setQuotesIdFav({quotesIdFav: dataQuotesIdFavNew}));
    updateQuotesIdFav(dataQuotesIdFavNew);
  }

  // const addQuotes = async () => {
  //   console.log('dataQuotes', dataQuotes);
  //   const dataQuotesJson = JSON.stringify(dataQuotes);
  //   const objDataQuotes = {};
  //   objDataQuotes.dataQuotesApp = dataQuotesJson;
  //   try {
  //     await setDoc(doc(db, "dataQuotes", 'quotesApp'), objDataQuotes);
  //     console.log('начинает прокатывать');
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }


  // return {addQuote, addQuoteFav, removeQuoteFav, quotesAll, loading, error, IdQuotesFav};
  return {
    initUser,
    initAppData,
    changeFavQuotes,
    loadIdQuotesFav,
    updateQuotesIdFav,
    loadQuotesUsers,
    updateQuotesUser,
    addFavQuote,
    removeFavQuote,
  };
}
