import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, addItemToCart, removeItemFromCart, clearCart } from "../feature/slice/Add_to_cart_slice.js";
import "../styles/Item_Cart.css"; // Custom CSS for the Cart page

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
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items-container">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-card">
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">Price: Rs. {item.price}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button className="cart-btn add-btn" onClick={() => handleAddToCart(item)}>
                    Add More
                  </button>
                  <button className="cart-btn remove-btn" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total-section">
            <h3 className="cart-total">Total: Rs. {totalPrice}</h3>
            <button className="cart-btn clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
