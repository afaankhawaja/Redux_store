
import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import "./storedata.css";

const StoreData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setData(data);
  };

  const handleAdd = (product) => {
    dispatch(addItem(product));
    toast.success("Added to cart");
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="cartWrapper">
        {currentItems.map((val, key) => (
          <div key={key} className="card">
            <img src={val.image} alt={val.title} />
            <div className="card-content">
              <h5>{val.title}</h5>
              <p><b>Price:</b> ${val.price}</p>
              <div className="btn-wrapper">
                <IconButton 
                  className="btn" 
                  onClick={() => handleAdd(val)} 
                  size="large" 
                  aria-label="add to shopping cart"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Toaster />
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </button>
      ))}
    </nav>
  );
};

export default StoreData;