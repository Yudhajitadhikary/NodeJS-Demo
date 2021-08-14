/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alter";
// const stripe=Stripe('pk_test_51J6x3USG9FLplHwVlShA68hmfP6cf2GA6goxhQPK77WjRQOBjPMVTEC25tKiW6D0nvPU7OyD3AhTy2upbYyzNpOb00bQ1oAbvB');
export const bookTour= async tourId=>{
    try{
// 1> Get checkout session from Api
const session=await axios(`http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`)
//2> Create the checkout form +charge the credit card for us
// await stripe.redirectToCheckout({
//     sessionId:session.data.session.id
// });
console.log(session)}
catch(err){
    console.log(err)
    showAlert('error',err)

}
}