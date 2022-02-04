import shoppingCart from "../../assets/icons/shopping-cart.png";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";

function Header() {

  const { state } = useContext(Context);
  
  return (
    <div className="header">
      <div className="header-wrapper">
        <h2>Wine & Spirits </h2>
        <p>Location: New York</p>
      </div>

    <Link to='/shopping-cart'>
      <div className="header-cart-wrapper">
        <img src={shoppingCart} alt="cart" />
        <div className="cart-count">
            <p>{state.itemAddedToCart.length}</p>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default Header;
