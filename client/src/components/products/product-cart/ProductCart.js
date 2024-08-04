// Cart.js

import React, { useState } from "react";
import "../../../assets/styles/components/products/product-cart/__cart.scss";

const ProductCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
  ]);
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  return (
    <div className="cart container my-5">
      <h1 className="cart__title mb-4">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart__empty-message">Your cart is empty.</p>
      ) : (
        <div className="cart-body row">
          <div className="cart__list col-md-8">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="cart__item row align-items-center py-3"
              >
                <div className="cart__item-image col-2">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                </div>
                <div className="cart__item-details col-6">
                  <h5 className="cart__item-name">{item.name}</h5>
                  <p className="cart__item-price">${item.price}</p>
                </div>
                <div className="cart__item-actions col-4 d-flex justify-content-end align-items-center">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart__item-quantity mx-3">
                    {item.quantity}
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart__pay col-md-4 align-items-center">
            <div className="cart__pay-detail">
              <span className="detail-quantily">Total product : 10</span>
            </div>
            <h5 className="cart_pay-total">Total : $999,999</h5>
            <p className="cart__pay-check">CHECK OUT</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
