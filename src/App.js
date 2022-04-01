import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ApiClient } from './ApiClient';
import { useState,useEffect} from 'react';
import WeatherCard from './WeatherCard';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import CurrentCard from './CurrentCard'

function App() {
  const [weather, changeWeather] = useState([]);
  const [city, changeCity] = useState("Sheffield");
  const [country, changeCountry] = useState("GB");
  const [lat, cLat] = useState(53.4)   
  const [lon, cLon] = useState(-1.4)
  const [temp, cTemp] = useState(0)
  const api = new ApiClient();  
  const opencage = require('opencage-api-client')  

  
  const forwardGeocode = ((cityName) => {
    opencage
    .geocode({q: `${cityName}`, language: 'en', key: '75ff133a0a4f44809ccba5c71325d59f'})
    .then((data) => {
      // console.log(JSON.stringify(data));
      if (data.results.length > 0) {      
        const place = data.results[0];       
        cLat(place.geometry.lat)
        cLon(place.geometry.lng)
        changeCity(place.components.city)
        const countryCode = place.components.country_code.toUpperCase()
        changeCountry(countryCode)        
      } else {
        console.log('Status', data.status.message);
        console.log('total_results', data.total_results);
      }
    })
    .catch((error) => {  
      
      console.log('Error', error.message);     
      
      if (error.status.code === 402) {
        console.log('hit free trial daily limit');
        console.log('become a customer: https://opencagedata.com/pricing');
      }
    });
  })   
  
  const buildCards = (() => {    
    return weather.map((day, i) => {
      if (i > 0) {

       return  (
        <Col key={i}>
          <CardGroup>
            <WeatherCard dt={day.dt} sunrise={day.sunrise} sunset={day.sunset} min={day.temp.min} max={day.temp.max} wind ={day.wind_speed} icon={day.weather[0].icon} description={day.weather[0].description}></WeatherCard>
          </CardGroup>
        </Col>
      )
    }
    })
  })

  const buildCurrentCard = (() => {
    return weather.map((day, i) => {
      if (i === 0) {
        return (
         
           
        <CurrentCard humidity={day.humidity} feelsLike={day.feels_like.day} city={city} country={country} dt={day.dt} sunrise={day.sunrise} sunset={day.sunset} min={day.temp.min} max={day.temp.max} wind ={day.wind_speed} icon={day.weather[0].icon} description={day.weather[0].description}></CurrentCard>
            
          
        )
      }
    })
  })

  useEffect(() => {       
    api.getWeather(lat, lon)
      .then( (res) => {      
        console.log(res)
        changeWeather(res.data.daily)
        cTemp(res.data.daily[0].temp.max)       
      })
  }, [lon]);

  const handleKeyPress = (e) => {
    
    if (e.key === 'Enter') {
      forwardGeocode(e.target.value)      
    }
  }

  return (
    <Container>
      <div className="flex mx-2 p-2 pt-5 justify-start max-w-xl mx-auto">
        <svg className="mr-6 group-hover:text-gray-500 text-indigo-600 transition-colors duration-200" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" >        
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/>
        </svg>
        <input className=" w-1/3 text-lg outline-none text-gray-600 placeholder-gray-500 focus:placeholder-gray-400" placeholder="Enter city name..." onKeyPress={handleKeyPress}></input>
      </div>
         
      <div className={(typeof temp != "undefined") ? ((temp > 16) ? 'bg-warm' : 'bg-cold') : 'bg'}>
        <main className="m-auto w-5/6 max-w-xl p-2">          
           
            {buildCurrentCard()}
          
        </main> 
      </div>    
      <Row className="row-cols-md-8">
        {buildCards()}
      </Row>

    </Container>
      
    
  );
}

export default App;
