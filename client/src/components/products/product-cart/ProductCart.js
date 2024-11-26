// Cart.js
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../../assets/styles/components/products/product-cart/__cart.scss";
import { TbLock } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import {
  deleteCartItem,
  getCartItems,
} from "../../../services/apiServerviceCart";
import { toast } from "react-toastify";
import HOST_IMG from "../../common/HostImg";
import { AuthContext } from "../../../context/AuthProvider";

const ProductCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const { id } = location.state || {};
  const idOrder = uuidv4();
  const { UserID } = location.state || {};
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      fetchCartItems(id);
    }
    if (UserID) {
      fetchCartItems(UserID);
    }
    fetchCartItems(user.id);
  }, [id, UserID, user.id]);

  const fetchCartItems = async (id) => {
    try {
      const res = await getCartItems(id);
      if (res.code !== 200) {
        return toast.error("Error server !");
      }
      setCartItems(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveItem = async (idCartItem) => {
    const res = await deleteCartItem(idCartItem);
    if (res.code !== 200) {
      return toast.error("error server");
    }

    setCartItems(cartItems.filter((item) => item.idCartItem !== idCartItem));
    toast.success("Delete successfully !");
  };

  const handleUpdateQuantity = (idProduct, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.ProductID === idProduct
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.ProductPrice * item.quantity, 0)
    .toFixed(3);

  return (
    <div className="cart container ">
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
                  <img
                    src={`${item.ProductImage}`}
                    alt={item.name}
                    className="img-fluid"
                  />
                </div>
                <div className="cart__item-details col-6">
                  <span className="cart__item-id">#{item.ProductID}</span>
                  <h5 className="cart__item-name">{item.ProductName}</h5>
                  <p className="cart__item-price">${item.ProductPrice}</p>
                </div>
                <div className="cart__item-actions col-12 d-flex justify-content-end align-items-center">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                      handleUpdateQuantity(item.ProductID, item.quantity - 1)
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
                      handleUpdateQuantity(item.ProductID, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => handleRemoveItem(item.idCartItem)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart__pay col-md-4 align-items-center col-12">
            <div className="cart__pay-detail">
              <span className="detail-quantily">
                Product Items: {cartItems.length || "NaN"}
              </span>
            </div>
            <h6 className="cart_pay-total">
              Total{" "}
              <p>
                $ <span>{totalPrice}</span>
              </p>
            </h6>
            <Link
              to={`/check-out/${idOrder}`}
              state={{
                idOrder: idOrder,
                idUser: user?.id,
                totalPrice: totalPrice,
              }}
            >
              <button className="btn btn-dark">
                CHECK OUT <TbLock />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
