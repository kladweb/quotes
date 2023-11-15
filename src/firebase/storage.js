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
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);

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

  const changeAllQuotes = (quote, action) => {
    const newQuotes = [...dataQuotes];
    let numActiveQuote = 0;
    newQuotes.forEach((v, index) => {
      if (v.id === quote.id) {
        numActiveQuote = index;
      }
    });
    switch (action) {
      case 'delete':
        newQuotes.splice(numActiveQuote, 1);
        break;
      case 'edit':
        newQuotes.splice(numActiveQuote, 1, quote);
        break;
      case 'add':
        const newQuote = {};
        newQuote.id = quote.id;
        newQuote.quote = quote.quote;
        newQuote.author = quote.author;
        newQuotes.push(newQuote);
        break;
    }
    updateQuotesAll(newQuotes)
      .then(() => {
        dispatch(quotesFetched({quotes: newQuotes, dataLoadStatus: 'loaded'}));
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  const changeUsersQuotes = (quote, action, dataQuotesUsersCurr = dataQuotesUsers) => {
    const newQuotes = [...dataQuotesUsersCurr];
    // const newDataQuotesIdFav = [...dataQuotesIdFav];
    let numActiveQuote = 0;
    newQuotes.forEach((v, index) => {
      if (v.id === quote.id) {
        numActiveQuote = index;
      }
    });
    // let numActiveIdFav = 0;
    // newDataQuotesIdFav.forEach((v, index) => {
    //   if (v.id === quote.id) {
    //     numActiveIdFav = index;
    //   }
    // });
    switch (action) {
      case 'delete':
        newQuotes.splice(numActiveQuote, 1);
        // newDataQuotesIdFav.splice(numActiveIdFav, 1);
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
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
    // updateQuotesIdFav(newDataQuotesIdFav)
    //   .then(() => {
    //     dispatch(setQuotesIdFav({quotesIdFav: newDataQuotesIdFav}));
    //   })
    //   .catch((e) => {
    //     console.error("Ошибка загрузки данных: ", e);
    //   });
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

  const addQuoteToAll = (quote) => {
    const newQuotesArr = [...dataQuotes];
    newQuotesArr.push(quote);
    updateQuotesAll(newQuotesArr)
      .then(() => {
        dispatch(quotesFetched({quotes: newQuotesArr, dataLoadStatus: 'loaded'}));
      });
  }

  const addFavQuote = (quote, dataQuotesIdFavCurrent = dataQuotesIdFav, isAdmin) => {
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
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  const removeFavQuote = (quote, dataQuotesIdFavCurrent = dataQuotesIdFav) => {
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
    updateQuotesIdFav(dataQuotesIdFavNew)
      .then(() => {
        dispatch(setQuotesIdFav({quotesIdFav: dataQuotesIdFavNew}));
      })
      .catch((e) => {
        console.error("Ошибка загрузки данных: ", e);
      });
  }

  return {
    initUser,
    initAppData,
    addQuoteToAll,
    changeAllQuotes,
    changeUsersQuotes,
    loadIdQuotesFav,
    updateQuotesIdFav,
    loadQuotesUsers,
    updateQuotesUser,
    addFavQuote,
    removeFavQuote,
  };
}
