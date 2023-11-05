import { collection, doc, limit, query, setDoc, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';

export const useStorage = () => {
  const currUser = useSelector(state => state.currUser.currUser);
  let idCurrUser = null;
  if (currUser) {
    idCurrUser = currUser.uid;
  }

  const [quotesAll, loading, error] = useCollectionData(query(
    collection(db, 'quotesApp')));

  const [IdQuotesFav, loadingFav, errorFav] = useCollectionData(query(
    collection(db, 'IdQuotesFav')));

  console.log('LOAD FIREBASE: ', loadingFav);

  // const [IdQuotesFav, loadingFav, errorFav] = useCollectionData(query(
  //   collection(db, 'IdQuotesFav'), where("id", "==", currQuote.id)));

  const addQuote = async (quote) => {
    try {
      await setDoc(doc(db, "quotesApp", quote.id), quote);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const addQuoteFav = async (quote) => {
    let IdQuoteFav = null;
    if (IdQuotesFav) {
      IdQuoteFav = IdQuotesFav[0];
    }
    const idQuote = quote.id;
    let idUsers = [];
    if (IdQuoteFav && IdQuoteFav.usersArr) {
      idUsers = [...IdQuoteFav.usersArr];
    }
    // console.log("IdQuotesFav", IdQuotesFav);
    // console.log("IdQuoteFav", IdQuoteFav);
    // console.log("IdUsers", idUsers);
    if (!idUsers.includes(idCurrUser)) {
      idUsers.push(idCurrUser);
    }
    const objFav = {};
    objFav.id = idQuote;
    objFav.usersArr = idUsers;
    try {
      await setDoc(doc(db, "IdQuotesFav", quote.id), objFav);
      // console.log('начинает прокатывать');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const removeQuoteFav = async (quote) => {
    const IdQuoteFav = IdQuotesFav[0];
    const idQuote = quote.id;
    let idUsers = [];
    if (IdQuoteFav) {
      idUsers = [...IdQuoteFav.usersArr];
    }
    // console.log("IdQuotesFav", IdQuotesFav);
    // console.log("IdQuoteFav", IdQuoteFav);
    // console.log("IdUsers", idUsers);
    if (idUsers.includes(idCurrUser)) {
      let i = idUsers.indexOf(idCurrUser);
      if (i >= 0) {
        idUsers.splice(i, 1);
      }
    }
    const objFav = {};
    objFav.id = idQuote;
    if (idUsers.length > 0) {
      objFav.usersArr = idUsers;
    }
    try {
      await setDoc(doc(db, "IdQuotesFav", quote.id), objFav);
      // console.log('начинает прокатывать');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // const readQuote = async () => {
  //   const q = query(collection(db, "IdQuotesFav"), where("id", "==", '67fcff02841'));
  //   // const q = query(collection(db, "IdQuotesFav"));
  //   const data = await getDocs(q);
  //   data.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  //   console.log(data);
  //   return q;
  // }


  return {addQuote, addQuoteFav, removeQuoteFav, quotesAll, loading, error, IdQuotesFav};
}
