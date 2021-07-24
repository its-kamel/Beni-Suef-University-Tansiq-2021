import axios from "axios"
import configData from '../config/production.json'
const SERVER_URL = configData.SERVER_URL ;

// admin
//Excel sheet
export async function putStudentsInfo (data){
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

//Tanseeq status
export async function putTanseeqStatus (data){
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

//Number of groups
export async function putNumberOfGroups (data){
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

// DepartmentsInfo
export async function getDepartmentsInfo (){
    try{
        const response = await axios.get( SERVER_URL+'endpoint',data,{headers:{token:localStorage.token}});
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
export async function putNewDepartmentInfo (data){
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
