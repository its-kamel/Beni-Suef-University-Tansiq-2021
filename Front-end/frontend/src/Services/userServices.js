import axios from "axios"
import configData from '../config/production.json'
const SERVER_URL = configData.SERVER_URL ;
//token handling
// accessToken = response.data.token;
// localStorage.token = accessToken;
// delete localStorage.token;

//user
export default async function getUserChoices (){
    try{
        const response = await axios.get( SERVER_URL+'endpoint',{headers:{token:localStorage.token}});
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

export async function putUserChoices (data){
    try{
        const response = await axios.put( SERVER_URL+'endpoint',data,{headers:{token:localStorage.token}});
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
        const response = await axios.get( SERVER_URL+'endpoint',{headers:{token:localStorage.token}});
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