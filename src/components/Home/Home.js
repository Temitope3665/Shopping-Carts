import React, { useState, useContext, useEffect } from "react";
import Header from "../Header/Header";
import search from "../../assets/icons/magnifying-glass.png";
import products from "../../mockdata";
import toast, { Toaster } from 'react-hot-toast';
import { Context } from "../../App";

const Home = () => {
  const { dispatch, state } = useContext(Context);
  const [searchItem, setSearchItem] = useState("");
  const [cartItems, setCartItems] = useState([])

  const searchItems = (e) => {
    setSearchItem(e.target.value);
  };
  const searchProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      product.country.toLowerCase().includes(searchItem.toLowerCase()) ||
      product.price.toLowerCase().includes(searchItem.toLowerCase())
    );
  });
  const handleClick = (product) => {
    setCartItems(state.itemAddedToCart)    
    const isCartSelected = cartItems.includes(product)
    !isCartSelected ? 
      (toast.success(`${product.name} added successfully to your cart at ${product.price}`, {
      duration: 1500,
      position: 'top-center',
      className: 'success',
  
      style: {
        background: '#E3FCEF',
        boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
        color: '#006544',
        fontSize: '14px'
      }
    }))

    (dispatch({
      type: 'ADD_ITEMS_TO_CART',
      payload: product
    }))
    :
    toast.error(`${product.name} has been added already to your cart.`, {
      duration: 1000,
      position: 'top-center',
  
      style: {
        background: '#FEEBEA',
        boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
        color: '#EE6D79',
        fontSize: '14px'
      }
    })
  };

  useEffect(()=>{
    dispatch({
      type: 'FETCH_LOCAL_STORAGE',
    })
  }, [])
  
  useEffect(() => {
    setCartItems(state.itemAddedToCart);
  }, [state]);

  useEffect(() => {
  }, [cartItems]);

  return (
    <div>
      <Header />
      <div className="search-bar">
        <img src={search} alt="search" />
        <input
          type="search"
          placeholder="Find product by name or code"
          onChange={searchItems}
          value={searchItem}
        />
      </div>

        <div className="items-wrapper">
          {searchProducts.map((product, index) => (
            <div className="products" key={product.id} onClick={() => handleClick(product)}>
              <div className="goods-content no-hover">
                <div className="goods-image">
                  <img src={product.img} alt="img" />
                </div>
                <div className="goods-info no-hover">
                  <h3>{product.name}</h3>
                  <span>Country: {product.country} - </span>{" "}
                  <span>Bottle Size: {product.size}</span>
                  <p>${product.price}</p>
                </div>
              </div>
              <div className="no-hover">
                <Toaster />
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Home;
