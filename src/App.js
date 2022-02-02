import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartSelected from './components/CartSelected/CartSelected';
import Home from './components/Home/Home';
import React, { useEffect, useReducer } from "react";

export const Context = React.createContext();

const initialState = {
  itemAddedToCart: [],
  error: '',
  id: ''
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ITEMS_TO_CART':
      const products = [action.payload, ...state.itemAddedToCart]
      localStorage.setItem('cart', JSON.stringify(products))
      return {
        ...state,
        itemAddedToCart: products,
        error: ''
      }
    case 'REMOVE_ITEMS_IN_CART':
      return {
        ...state,
        itemAddedToCart: action.payload
      }
    case 'GETTING_ALL_ITEMS_IN_CART':
      return {
        ...state,
        error: '',
        itemAddedToCart: action.payload 
      }
    case 'FETCH_LOCAL_STORAGE':
      return {
        ...state,
        error: '',
        itemAddedToCart: JSON.parse(localStorage.getItem('cart')) || []
      }
    default:
      return state
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
              <Route path='/shopping-cart' element={<CartSelected />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
