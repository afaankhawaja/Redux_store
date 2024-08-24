
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../store/cartSlice";
import "./cart.css";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import toast, { Toaster } from "react-hot-toast";
import { IconButton } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleDelete = (product) => {
    dispatch(removeItem(product));
    toast.error("Removed from cart");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.data.price, 0).toFixed(2);
  };


  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, key) => (
              <div key={key} className="cart-item">
                <div className="item-image">
                  <img src={item.data.image} alt={item.data.title} />
                </div>
                <div className="item-details">
                  <h3>{item.data.title}</h3>
                  <p className="price">${item.data.price.toFixed(2)}</p>
                </div>
                <IconButton 
                  onClick={() => handleDelete(item.id)} 
                  className="remove-btn"
                  aria-label="remove from cart"
                >
                  <RemoveShoppingCartIcon />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${getTotalPrice()}</h3>
          </div>
        </>
      )}  
      <Toaster />
    </div>
  );
};

export default Cart;
