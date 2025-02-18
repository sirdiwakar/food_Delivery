import React, {useContext, useEffect, useState} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}));
  }

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount() ===0){
      navigate("/cart");
    }
  }, [token])
  
  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 12
    }
    try{
      const response = await axios.post(`${url}/api/order/place`, orderData, {headers: {token}});
      if(response.data.success){
        const {order_id, amount, currency, key, order_db_id} = response.data;
        const options = {
          key: key,
          amount: amount,
          currency: currency,
          name: "Food Delivery",
          description: "Complete your order payment",
          order_id: order_id,
          handler: async function (response) {
            try {
              const verifyResponse = await axios.post(`${url}/api/order/verify-payment`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_db_id: order_db_id
              });

              if (verifyResponse.data.success) {
                alert("Payment Successful!");
                navigate("/myorders");
              } else {
                alert("Payment verification failed.");
                navigate("/");
              }
            } catch (err) {
              alert("Error verifying payment.");
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone
          },
          theme: {color: "#3399cc"}
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }else{
        alert("Error processing order")
      }
    }catch(err){
      console.log(err);
      alert("Payment failed. Please try again");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name="email" value={data.email} type="text" placeholder='Email address' />
        <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} type="text" name="state" value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="zipcode" value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>${getTotalCartAmount()===0?0:12}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div> 
          </div>
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
