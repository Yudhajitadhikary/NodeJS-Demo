/* eslint-disable */
import axios from 'axios';
import {showAlert} from './alter';
export const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/login',
      data: {
        email,
        password
      },
    });
    if(res.data.status==='success'){
      showAlert('success','Logged in successfully!')
      window.setTimeout(()=>{
        location.assign('/overview')},1500)
    }
    console.log(res);
  } catch (err) {
    showAlert('error',err.response.data.message)
  }
};
export const logout=async()=>{
  try{
    console.log('Hello')
const res=await axios({method:'GET',url:'http://localhost:8000/api/v1/users/logout'})
console.log(res)
if((res.data.status='success')) location.reload();
  }catch(err){
    // console.log(err.response)
    showAlert('error','Error logging out!Try again')
  }
}


