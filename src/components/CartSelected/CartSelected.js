import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import remove from "../../assets/icons/remove.png";

const CartSelected = () => {
  const { dispatch, state } = useContext(Context);
  const [clear, setClear] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  // get initial items from local storage
  const totalProductAdded = () => {
      let getItems;
      getItems = JSON.parse(localStorage.getItem("cart"));
      setProducts(getItems);
  
      if (getItems !== null) {
        let itemTotal;
        itemTotal = getItems.map((item) => Number(item.price * item.quantity));
        itemTotal = itemTotal.reduce((prev, curr) => prev + curr, 0);
        setTotalProducts(itemTotal);
      } else {
        console.log("error");
      }
  }

  useEffect(() => {
    dispatch({
      type: "FETCH_LOCAL_STORAGE",
    });
    totalProductAdded()
  }, []);

  useEffect(() => {
      totalProductAdded()
  }, [state.itemAddedToCart]);

  const clearItems = () => {
    setClear(true);
    localStorage.clear();
  };

  let getTotal;

  // update item in cart
  const modifyCart = (item_id, value) => {
    const selectedProduct = state.itemAddedToCart.find(
      (item) => item.id === item_id
    );
    const selectedProductIndex = state.itemAddedToCart.findIndex(
      (item) => item.id === item_id
    );
    const products = [...state.itemAddedToCart];
    const updatedProduct = {
      ...selectedProduct,
      quantity: selectedProduct.quantity + value,
    };
    products[selectedProductIndex] = updatedProduct;
    localStorage.setItem("cart", JSON.stringify(products));

    // getting totals from the local storage
    const getUpdatedItemFromLocalStorage = JSON.parse(
      localStorage.getItem("cart")
    );
    getTotal = getUpdatedItemFromLocalStorage.map((item) =>
      Number(item.price * item.quantity)
    );
    getTotal = getTotal.reduce((prev, curr) => prev + curr, 0);
    setTotalProducts(getTotal);
    dispatch({
      type: "REMOVE_ITEMS_IN_CART",
      payload: products,
    });
  };

  // remove item
  const removeItem = (id) => {
    let newItem = [...state.itemAddedToCart];
    const notRemovedItem = newItem.filter((each) => each.id !== id);
    dispatch({
      type: "REMOVE_ITEMS_IN_CART",
      payload: notRemovedItem,
    });
    localStorage.setItem("cart", JSON.stringify(notRemovedItem));
  };

  return (
    <div className="cart-details">
      <div className="cart-wrapper">
        <Link to="/">
          <h1>Cart</h1>
        </Link>
        <button className="cart-clear-btn" onClick={clearItems}>
          Clear
        </button>
      </div>

      {clear ? (
        "All item has been cleared, kindly proceed to home"
      ) : (
        <div>
          {products !== null
            ? products.map((item) => (
                <div className="cart-items" key={item.id}>
                  <div className="cart-product-img">
                    <img src={item.img} alt="drink" />
                  </div>
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <span>Bottle Size: {item.size}</span>
                    <p>${item.price * item.quantity}</p>
                  </div>
                  <div className="cart-number">
                    <div className="cart-number-plus" onClick={() => modifyCart(item.id, 1)}> + </div>
                    <p>{item.quantity < 1 ? item.quantity === 1 : item.quantity}</p>
                    {item.quantity <= 1 ? (
                      <div className="cart-number-minus-disabled" onClick={() => setIsDisabled(true)}> - </div>
                    ) : (
                      <div className="cart-number-minus" onClick={() => modifyCart(item.id, -1)}> - </div>
                    )}
                  </div>
                  <img className="cart-remove" src={remove} alt="remove" onClick={() => removeItem(item.id)} />
                </div>
              ))
            : "All item has been cleared, kindly proceed to home"}

          <div className="cart-total">
            <p>Total </p>
            <div className="cart-total-wrapper">
              <p>${totalProducts}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSelected;
