import { hexToRgb } from "@material-ui/core";
import axios from "axios"
import configData from '../config/production.json'
import $ from "jquery"
import { ResponsiveEmbed } from "react-bootstrap";
const SERVER_URL = configData.SERVER_URL ;
//token handling
// accessToken = response.data.tokens;
// localStorage.token = accessToken;
// delete localStorage.token;
// "SERVER_URL": "https://thingproxy.freeboard.io/fetch/https://www.fotone.me/api/"
// localStorage.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1vaGFtbWVkOTlrYW1lbEB5YWhvby5jb20iLCJuYXRpb25hbF9pZCI6MzAyMDEyNjE4MDIwMDcsImV4cCI6MTYyNzY1MDQyOX0.MHHJau4-DG3FI69sqOUc6f7x2AsaCOTyXElF7NxY1t8"

//user
export default async function getUserChoices (){
    try{
        const response = await axios.get( SERVER_URL+'desires/',{headers:{'Authorization': `token ${localStorage.token}`}});
        //Success
        // const data = await response.data
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

export async function putUserChoices (ids){
    try{
        const response = await axios.put( SERVER_URL+'desires/edit',ids,{headers:{'Authorization': `token ${localStorage.token}`}});
        //Success
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

export async function getResults (){
    try{
        const response = await axios.get( SERVER_URL+'users/result',{headers:{'Authorization': `token ${localStorage.token}`}});
        //Success
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

export async function getIsEnabled (){
  try{
      const response = await axios.get( SERVER_URL+'desires/enable',{headers:{'Authorization': `token ${localStorage.token}`}});
      //Success
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