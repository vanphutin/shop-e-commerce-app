import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import ProductCart from "../products/product-cart/ProductCart";
import ProductCard from "../products/product-card/ProductCard";
import { getCartItems } from "../../services/apiServerviceCart";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import FormPay from "./FormPay";
import { CiMoneyCheck1 } from "react-icons/ci";

const Pay = () => {
  const [productItem, setProductItem] = useState([]);
  const location = useLocation();
  const { id } = location.state || {};
  const { totalPrice } = location.state || {};
  console.log(totalPrice);

  useEffect(() => {
    fetchCartItems(id);
  }, []);
  const fetchCartItems = async (id) => {
    try {
      const res = await getCartItems(id);
      if (res.code !== 200) {
        return toast.error("Error server !");
      }
      setProductItem(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="container pay ">
      <div className="pay__container row">
        <div className="pay__product col-6">
          <div className="pay__product-back">
            <h5 className="back-to-cart">
              {" "}
              <IoChevronBackOutline />
              Back to cart
            </h5>
          </div>
          <div className="pay__product-title">
            <h5 className="title">Products infomatin & review</h5>
          </div>
          <ul className="pay__product-item p-0 lis">
            {productItem &&
              productItem.map((items, index) => (
                <li className="pay__product-items" key={index}>
                  <ProductCard
                    productCart={items}
                    mainclassName="row"
                    imageclassName="col-4"
                    detailclassName="col-8"
                    sizeImg="500"
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="pay__info col-6">
          <div className="pay__product-back pay__info-detail">
            <h5 className="back-to-cart">Payment details</h5>
          </div>
          <div className="pay__product-form">
            <FormPay />
          </div>
          <div className="pay__product-pay-method">
            <div className="pay-method">
              <div className="pay-method-icon">
                <CiMoneyCheck1 />
              </div>
              <div className="pay-method-text">Debit / Credit Card</div>
            </div>
          </div>
        </div>
        <h1>Form</h1>
      </div>
    </div>
  );
};

export default Pay;
