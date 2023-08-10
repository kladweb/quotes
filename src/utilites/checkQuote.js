function checkQuote(newQuote, dataQuotes, setSameQuote) {
  const newQuoteTrim = newQuote.slice(0, 20);
  for (let i = 0; i < dataQuotes.length; i++) {
    if (newQuoteTrim.toLowerCase() === dataQuotes[i].quote.slice(0, 20).toLowerCase()) {
      setSameQuote(dataQuotes[i].quote);
      return true;
    }
  }
  setSameQuote('');
  return false;
}

export default checkQuote;