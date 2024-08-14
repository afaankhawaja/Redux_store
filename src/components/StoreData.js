import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import toast,{Toaster} from 'react-hot-toast';


import "./storedata.css";
import { addItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";
const StoreData = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchProducts());

    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setData(data);
    console.log(data);
  };
  const handleAdd = (product)=>{
    // dispatch(addItem({id: product._id ,name :  product.title}));
dispatch(addItem(product))
toast.success("Added to cart");
  }
  return (
    <div className="cartWrapper">
      {data.map((val,key) => {
        return (
          <div key={key} className="card">
            <img src={val.image} />
            <h5>{val.title}</h5>
            <p>
              <b>price:</b>${val.price}{" "}
            </p>
            <div className="btn">
            <IconButton onClick={()=>handleAdd(val)} size="large"  aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
      </div>
      <Toaster />
            {/* <button onClick={()=>handleAdd(val)}>ADD</button> */}
          </div>
        );
      })}
    </div>
  );
};

export default StoreData;
