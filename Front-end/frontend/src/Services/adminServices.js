import axios from "axios"
import configData from '../config/production.json'
const SERVER_URL = configData.SERVER_URL ;

// admin
export default async function getIsEnabled (){
  try{
      const response = await axios.get( SERVER_URL+'desires/form',{headers:{'Authorization': `token ${localStorage.token}`}});
      //Success
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

// charts
export async function getPieData (){
  try{
      const response = await axios.get( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

export async function getBarData (){
  try{
      const response = await axios.get( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

export async function getTableData (){
  try{
      const response = await axios.get( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

//Excel sheet
export async function putStudentsInfo (data){
  try{
      const response = await axios.put( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

//Tanseeq status
export async function putTanseeqStatus (data){
  try{
      const response = await axios.put( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

//Number of groups
export async function putNumberOfGroups (data){
  try{
      const response = await axios.put( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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
}


// DepartmentsInfo
export async function getDepartmentsInfo (){
    try{
        const response = await axios.get( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

//Edit department Capacity
export async function putNewDepartmentInfo (data,id){
  try{
      const response = await axios.put( SERVER_URL+'endpoint/'+id,data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

//put start and end dates
export async function putDeadlineDates(data){
  try{
      const response = await axios.put( SERVER_URL+'endpoint',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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