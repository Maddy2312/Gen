import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { items } = cart;
  

  useEffect(() => {
    console.log(items);
  }, [items])
  
  return (
    <div>Cart</div>
  )
}

export default Cart