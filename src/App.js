import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Map from './Map'




const apikey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY




function App() {
  return (
    <div className="App"> 
  <Map apikey={apikey} />
    </div>
  );
}

export default App;
