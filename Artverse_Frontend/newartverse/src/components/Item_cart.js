import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, addItemToCart, removeItemFromCart, clearCart } from "../feature/slice/Add_to_cart_slice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    if (userEmail) dispatch(fetchCart(userEmail));
  }, [dispatch, userEmail]);

  const handleAddToCart = (item) => {
    if (userEmail) dispatch(addItemToCart({ ...item, userEmail }));
    else alert("Please log in to perform this action.");
  };

  const handleRemove = (id) => userEmail && dispatch(removeItemFromCart({ id, userEmail }));
  const handleClearCart = () => userEmail && dispatch(clearCart(userEmail));

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleAddToCart(item)}>Add more</button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <div>
            <h3>Total: Rs. {totalPrice}</h3>
            <button onClick={handleClearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
