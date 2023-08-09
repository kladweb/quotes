import { useSelector } from 'react-redux';

function HintAuthors({author}) {

  const dataQuotesNoSort = useSelector(state => state.quotes.quotes);
  const sortingData = (data) => {
    const newData = data.reduce((result, item) => {
      let adding = true;
      result.forEach((elem) => {
        if (elem.author === item.author) {
          adding = false;
        }
      });
      if (adding) {
        return [...result, item];
      } else {
        return [...result];
      }
    }, []);
    newData.sort((a, b) => {
      if (a.author > b.author) return 1;
      if (b.author > a.author) return -1;
      if (a.author === b.author) return 0;
    });
    return newData;
  }

  const dataQuotes = sortingData(dataQuotesNoSort);
  const listGroup = dataQuotes.map(name => <option key={name.id} value={name.author}/>);

  return (
    <>
      {
        (author.length >= 1) &&
        <datalist id="datalistOptions">
          {listGroup}
        </datalist>
      }
    </>
  );
}

export default HintAuthors;