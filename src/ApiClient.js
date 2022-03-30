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
        return this.getItems("");
    }




}