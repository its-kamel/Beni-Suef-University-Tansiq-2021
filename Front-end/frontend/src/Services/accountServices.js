import axios from "axios"
import configData from '../config/production.json'
import $ from "jquery"

const SERVER_URL = configData.SERVER_URL ;

export default async function signUp (props){
  const {
    email, password, name , national_id,
  } = props;
  try{
      const response = await axios.post( SERVER_URL+'users/sign-up',{
        
        headers: {
          'content-type': 'application/json',
        },

        email,
        password,
        national_id,
        name,
      
      });
      //Success
      console.log(response)
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

        var error = error.response.data;
        
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

export async function login (props){
  const {
    email, password,
  } = props;

    try{
        const response = await axios.post( SERVER_URL+'users/login/',{

          headers: {
            'content-type': 'application/json',
          },

          email,
          password,
        });
        console.log(response)
        localStorage.removeItem('token')
        localStorage.setItem('token', response.data.tokens);
        console.log(localStorage);
        return(response)

    } catch (error){
        if (error.response){

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request){

          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error);
    }
};

export async function addAdmin (props){
  const {
    email, national_id,
  } = props;

    try{
        const response = await axios.post( SERVER_URL+'users/addAdmin',props,{

          headers:{
            'Authorization': `token ${localStorage.token}`,
          },

        });
        console.log(response)
        return(response)

    } catch (error){
        if (error.response){

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

        } else if (error.request){

          console.log(error.request);
        } else {

          console.log('Error', error.message);
        }
        console.log(error);
    }
};