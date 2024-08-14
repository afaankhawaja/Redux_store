import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../store/cartSlice";
import "./cart.css";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import toast,{Toaster} from "react-hot-toast";
import { IconButton } from "@mui/material";


const Cart = () => {
  const dispatch = useDispatch();
  const handleDelete = (product) => {
    dispatch(removeItem(product));
    toast.error("Removed from cart");
  };
  const cartItems = useSelector((state) => state.cart);
  // const cartId=useSelector((state)=>state.cart._id)

  console.log();
  return (
    <div className="cart">
      {cartItems.map((val, key) => {
        return (
          <div key={key} className="card">
            <img src={val.data.image} alt=''/>
            <h5>{val.data.title}</h5>
            <p>
              <b>price: </b>${val.data.price}{" "}
            </p>
            <div className="btn">
            <IconButton onClick={() => handleDelete(val.id)}><RemoveShoppingCartIcon/></IconButton>
            </div>
          </div>
        );
      })}
      <Toaster/>
    </div>
  );
};

export default Cart;
