import Quotes from '../components/Quotes';
import ScrollUp from '../components/ScrollUp';

function PageMain() {

  return (
    <div className="App bg-body-secondary">
      <ScrollUp/>
      <Quotes favorite={false}/>
    </div>
  );
}

export default PageMain;