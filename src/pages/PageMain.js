import Quotes from '../components/Quotes';

function PageMain() {

  return (
    <div className="App bg-body-secondary pb-5 ">
      <Quotes favorite={false}/>
    </div>
  );
}

export default PageMain;