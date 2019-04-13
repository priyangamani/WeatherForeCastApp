
import axios from 'axios';

export const weatherApi = () =>{
  return axios.get("https://api.darksky.net/forecast/c2ec7b3bfe22f88719479f3e151b7ba4/3.1390,101.6869")
}
   


