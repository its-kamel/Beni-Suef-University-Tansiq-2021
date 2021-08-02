import axios from "axios"
import configData from '../config/production.json'
import $ from "jquery"
const SERVER_URL = configData.SERVER_URL ;

// admin
export default async function getIsEnable(){
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
      const response = await axios.get( SERVER_URL+'desires/department-students',{headers:{'Authorization': `token ${localStorage.token}`}});
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
      const response = await axios.get( SERVER_URL+'desires/departments',{headers:{'Authorization': `token ${localStorage.token}`}});
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

export async function getTableData (id){
  try{
      const response = await axios.get( SERVER_URL+'desires/'+id+'/students-list',{headers:{'Authorization': `token ${localStorage.token}`}});
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
export async function postStudentsInfo (data){
  try{
      const response = await axios.post( SERVER_URL+'desires/grades-upload',data,{headers:{ 'Content-Type': 'multipart/form-data','Authorization': `token ${localStorage.token}`}});
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
      const response = await axios.put( SERVER_URL+'desires/form',{is_enabled:data},{headers:{'Authorization': `token ${localStorage.token}`}});
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
export async function putSortStatus (data){
  console.log(localStorage.token)
  try{
      const response = await axios.put( SERVER_URL+'users/sort/',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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
      const response = await axios.put( SERVER_URL+'desires/groups',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

export async function getNumberOfGroups (){
  try{
      const response = await axios.get( SERVER_URL+'desires/groups',{headers:{'Authorization': `token ${localStorage.token}`}});
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
        const response = await axios.get( SERVER_URL+'desires/capacity',{headers:{'Authorization': `token ${localStorage.token}`}});
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
      const response = await axios.put( SERVER_URL+'desires/'+id+'/capacity',{Capacity:data},{headers:{'Authorization': `token ${localStorage.token}`}});
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
      const response = await axios.put( SERVER_URL+'desires/set-dates',data,{headers:{'Authorization': `token ${localStorage.token}`}});
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

//get dates
export async function getDeadlineDates(){
  try{
      const response = await axios.get( SERVER_URL+'desires/dates',{headers:{'Authorization': `token ${localStorage.token}`}});
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