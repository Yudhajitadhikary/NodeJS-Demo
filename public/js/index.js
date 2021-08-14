/* eslint-disable */
import '@babel/polyfill';
import {login,logout} from './login';
import {displayMap} from './mapbox';
import{updateSettings} from './updateSettings';
// import { bookTour } from './stripe';
//DOM
const mapBox=document.getElementById('map');
const loginForm=document.querySelector('.form--login');
const logOutBtn=document.querySelector('.nav__el--logout')
const userDataForm=document.querySelector('.form-user-data')
const userPasswordForm=document.querySelector('.form-user-password')
const bookBtn=document.getElementById('book-tour')
console.log(bookBtn)
if(mapBox){
const locations = JSON.parse(document.getElementById('map').dataset.locations);
displayMap(locations);
}

if(loginForm){
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
login(email, password);
});
}
if(logOutBtn) logOutBtn.addEventListener('click',logout)
if(userDataForm)
userDataForm.addEventListener('submit',e=>{
  e.preventDefault();
  const form=new FormData();
  form.append('name',document.getElementById('name').value)
  form.append('email',document.getElementById('email').value)
  form.append('photo',document.getElementById('photo').files[0])
  console.log(form);
  // const name=document.getElementById('name').value
  // const email=document.getElementById('email').value
  updateSettings(form,'data')

})
if(userPasswordForm)

userPasswordForm.addEventListener('submit',async e=>{
  e.preventDefault();
  document.querySelector('.btn--save-password').value='Updating...'
  const passwordCurrent=document.getElementById('password-current').value
  const password=document.getElementById('password').value
  const passwordConfirm=document.getElementById('password-confirm').value
  const email=document.getElementById('email').value
  await updateSettings({passwordCurrent,password,passwordConfirm},'password')
  document.querySelector('.btn--save-password').textContent='Saved Password'
  document.getElementById('.password-current').textContent='';
  document.getElementById('.password').textContent='';
  document.getElementById('.password-confirm').textContent='';
})

// if(bookBtn)
// bookBtn.addEventListener('click',e=>{
//   console.log('Processing')
//   e.target.textContent='Processing...'
//   const {tourId}=e.target.dataset;
// bookTour(tourId)
// })
