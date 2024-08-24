
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaStore } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavBar = () => {
  const items = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <FaStore size={28} />
          <span className="brand-name">Afaan's Shop</span>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>HOME</Link>
          <Link to="/cart" onClick={toggleMenu}>CART</Link>
          <Link to='/contact' onClick={toggleMenu}>CONTACT</Link>
        </div>
        <div className="navbar-cart">
          <Link to="/cart" className="cart-items">
            <AddShoppingCartIcon />
            <span>{items.length}</span>
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;