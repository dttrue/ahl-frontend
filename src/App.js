import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="homepage__header">
        <h1>Header</h1>
      </header>
      <div className="homepage__body">
      <h1 className='homepage__title'>Affordable Homes</h1> 
      <input type="text" className="search__bar" placeholder="Enter a neighborhood or ZIP code" />
      </div>
    </div>



  );
}


export default App;
