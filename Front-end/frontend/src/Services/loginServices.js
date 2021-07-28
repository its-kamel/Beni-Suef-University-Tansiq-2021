import axios from "axios"
import configData from '../config/production.json'
const SERVER_URL = configData.SERVER_URL ;
import { useHistory } from 'react-router-dom';
const history = useHistory();

export default async function login (data){
    try{
        const response = await axios.post( SERVER_URL+'/users/login/',{data});
        //Success
        console.log(response)
        localStorage.setItem('access token', response.data.tokens.access);
        history.push('/user');
        return(response)

    } catch (error){
        if (error.response){
          /*
          * The request was made and the server responded with a
          * status code that falls out of the range of 2xx
          */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request){
          /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log('Error', error.message);
        }
        console.log(error);
    }
};
