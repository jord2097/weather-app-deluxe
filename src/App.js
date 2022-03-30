
import './App.css';
import { ApiClient } from './ApiClient';
import { useState,useEffect} from 'react';
import WeatherCard from './WeatherCard';

function App() {

  const [weather, changeWeather] = useState({});
  const api = new ApiClient();

  useEffect(() => {
   

}, []);



  return (
    <div className="App">
    
    </div>
  );
}

export default App;
