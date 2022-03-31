import axios from "axios";

export class ApiClient {
    responseStatusCheck(responseObject) {
        if(responseObject.status >= 200 && responseObject.status < 300){
          return Promise.resolve(responseObject);
    
        }else{
          return Promise.reject(new Error(responseObject.statusText));
        }
   
   
     }

     getItems(url){
        return axios
        .get(url)
        .then(this.responseStatusCheck)
        .catch((error) => {
            console.log(error);

        })
     }
    
    getLatLon(cityName) {
      return this.getItems(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=4340a8146e26f2d7d6d12e60ecf0ecc3`)
    }
     
    getWeather(lat, lon){
        return this.getItems(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=4340a8146e26f2d7d6d12e60ecf0ecc3`);
    }

    

    


    



}