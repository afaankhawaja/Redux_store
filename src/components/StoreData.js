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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (retries = 3) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        setTimeout(() => fetchProducts(retries - 1), 2000); // Wait 2 seconds before retrying
      } else {
        setError("Failed to fetch products. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
