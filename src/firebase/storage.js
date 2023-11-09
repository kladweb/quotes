import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, limit, query, setDoc, getDoc, where, getDocs } from 'firebase/firestore';
import { setQuotesUsers } from '../redux/quotesUsersSlice';
import { setQuotesIdFav } from '../redux/quotesIdFavSlice';
import { db } from './firebase';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

export const useStorage = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.currUser.currUser);
  let idCurrUser = null;
  if (currUser) {
    idCurrUser = currUser.uid;
  }
  const dataQuotesIdFav = useSelector(state => state.quotesIdFav.quotesIdFav);
  const dataQuotes = useSelector(state => state.quotes.quotes);
  const dataQuotesUsers = useSelector(state => state.quotesUsers.quotesUsers);


  // const [quotesAll, loading, error] = useCollectionData(query(
  //   collection(db, 'quotesApp')));
  //
  // const [IdQuotesFav, loadingFav, errorFav] = useCollectionData(query(
  //   collection(db, 'IdQuotesFav')));

  // console.log('LOAD FIREBASE: ', loadingFav);

  // const [IdQuotesFav, loadingFav, errorFav] = useCollectionData(query(
  //   collection(db, 'IdQuotesFav'), where("id", "==", currQuote.id)));

  // const addQuote = async (quote) => {
  //   try {
  //     await setDoc(doc(db, "quotesApp", quote.id), quote);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  // const addQuoteFav = async (quote) => {
  //   let IdQuoteFav = null;
  //   if (IdQuotesFav) {
  //     IdQuoteFav = IdQuotesFav[0];
  //   }
  //   const idQuote = quote.id;
  //   let idUsers = [];
  //   if (IdQuoteFav && IdQuoteFav.usersArr) {
  //     idUsers = [...IdQuoteFav.usersArr];
  //   }
  //   // console.log("IdQuotesFav", IdQuotesFav);
  //   // console.log("IdQuoteFav", IdQuoteFav);
  //   // console.log("IdUsers", idUsers);
  //   if (!idUsers.includes(idCurrUser)) {
  //     idUsers.push(idCurrUser);
  //   }
  //   const objFav = {};
  //   objFav.id = idQuote;
  //   objFav.usersArr = idUsers;
  //   try {
  //     await setDoc(doc(db, "IdQuotesFav", quote.id), objFav);
  //     // console.log('начинает прокатывать');
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  // const removeQuoteFav = async (quote) => {
  //   let IdQuoteFav = null;
  //   if (IdQuotesFav) {
  //     IdQuoteFav = IdQuotesFav[0];
  //   }
  //   const idQuote = quote.id;
  //   let idUsers = [];
  //   if (IdQuoteFav) {
  //     idUsers = [...IdQuoteFav.usersArr];
  //   }
  //   // console.log("IdQuotesFav", IdQuotesFav);
  //   // console.log("IdQuoteFav", IdQuoteFav);
  //   // console.log("IdUsers", idUsers);
  //   if (idUsers.includes(idCurrUser)) {
  //     let i = idUsers.indexOf(idCurrUser);
  //     if (i >= 0) {
  //       idUsers.splice(i, 1);
  //     }
  //   }
  //   const objFav = {};
  //   objFav.id = idQuote;
  //   if (idUsers.length > 0) {
  //     objFav.usersArr = idUsers;
  //   }
  //   try {
  //     await setDoc(doc(db, "IdQuotesFav", quote.id), objFav);
  //     // console.log('начинает прокатывать');
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  // const readQuote = async () => {
  //   const q = query(collection(db, "IdQuotesFav"));
  //   // const q = query(collection(db, "IdQuotesFav"));
  //   const data = await getDocs(q);
  //   data.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  //   console.log(data);
  //   return q;
  // }

  const readIdQuotesFav = async () => {
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

  const readQuotesUsers = async () => {
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
  return {readIdQuotesFav, updateQuotesIdFav, readQuotesUsers, updateQuotesUser, addFavQuote, removeFavQuote};
}
