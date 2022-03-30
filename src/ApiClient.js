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

     
    getWeather(){
        return this.getItems("https://api.openweathermap.org/data/2.5/onecall?lat=0&lon=0&units=metric&exclude=hourly,minutely&appid=817b9588cde4ff15fdc254ea056b9c73");
    }




}