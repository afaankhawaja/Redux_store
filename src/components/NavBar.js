
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Button from '@mui/material/Button';

import { FaStore } from "react-icons/fa";
import { useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const NavBar = () => {
  const items = useSelector((state) => state.cart);
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <FaStore size={28} />
        <span className="brand-name">Zigy Shop</span>
      </div>
      <div className="navbar-links">
      <Link to="/" 
        > <div className="1" color="primary" variant="Text">HOME</div></Link>
     <Link to="/cart"> <div className="2" variant="Text" startIcon={<AddShoppingCartIcon />}>CART</div>  </Link>
     <Link to='/contact'> <div className="3" >CONTACT</div>  </Link>
        {/* <div className="cart-items"><span>{<AddShoppingCartIcon/>}cart:{items.length}</span></div> */}
        <div className="cart-items">
  <span className="cart-content">
    <AddShoppingCartIcon />
    cart: {items.length}
  </span>
</div>

      </div>
    </div>
  );
};

export default NavBar;
