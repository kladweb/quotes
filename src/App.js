import './App.css';
import Quotes from "./components/Quotes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App bg-body-secondary pb-5 ">
      <Header/>
      <Quotes/>
    </div>
  );
}

export default App;