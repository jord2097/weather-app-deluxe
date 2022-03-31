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
  const [city, changeCity] = useState("");
  const [country, changeCountry] = useState("");
  const [lat, cLat] = useState(0)   
  const [lon, cLon] = useState(0)
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
      })
    
    forwardGeocode("")
    

}, []);

  return (
    <Container>
      <Navbar bg="success" variant="dark">
        <Navbar.Brand href="#"> Weather in {city} ( {lat}, {lon} ) </Navbar.Brand>
      </Navbar>
      <main className="m-auto w-5/6 max-w-xl">
          {buildCurrentCard()}
      </main>     
      <Row className="row-cols-md-8">
        {buildCards()}
      </Row>

    </Container>
      
    
  );
}

export default App;
