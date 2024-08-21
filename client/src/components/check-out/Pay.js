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
  const { product } = location.state || {};

  useEffect(() => {
    if (id) {
      fetchCartItems(id);
    }
  }, [id]);
  const fetchCartItems = async (id) => {
    try {
      const res = await getCartItems(id);
      if (res.code !== 200) {
        return toast.error("Error server !");
      }

      setProductItem(id ? res.data : product);
    } catch (error) {
      console.log("error", error);
    }
  };
  const ulStyle = {
    listStyle: "none",
    height: "560px",
    overflowY: "scroll",
  };
  return (
    <div className="container pay mt-3 ">
      <div className="pay__container row">
        <h5 className="back-to-cart fs-5">
          <IoChevronBackOutline />
          Back to cart
        </h5>
        <div className="pay__product col-6 bg-secondary text-white">
          <div className="pay__product-back"></div>
          <div className="pay__product-title">
            <h5 className="title mt-1">
              Products infomatin & review{" "}
              <b className="mx-5"> {productItem?.length || 1} items</b>
            </h5>
            <hr />
          </div>
          <ul className="pay__product-item p-0 lis" style={ulStyle}>
            {productItem && id ? (
              productItem.map((items, index) => (
                <li className="pay__product-items mb-2" key={index}>
                  <ProductCard
                    productCart={id ? items : product}
                    mainclassName="row"
                    imageclassName="col-4"
                    detailclassName="col-8"
                    sizeImg="500"
                    Linkto="/products/detail"
                  />
                </li>
              ))
            ) : (
              <li className="pay__product-items mb-2" key={product.ProductID}>
                <ProductCard
                  productCart={product}
                  mainclassName="row"
                  imageclassName="col-4"
                  detailclassName="col-8"
                  sizeImg="500"
                  Linkto="/products/detail"
                />
              </li>
            )}
          </ul>
        </div>
        <div className="pay__info col-6 " style={{ paddingLeft: "60px" }}>
          <div className="pay__product-back pay__info-detail">
            <h5 className="back-to-cart my-2 text-center fs-2">
              Payment details
            </h5>
          </div>
          <div className="pay__product-form">
            <FormPay price={product?.ProductID} />
          </div>
          <div className="pay__product-check-out  ">
            <button className="btn btn-dark w-100 ">
              Pay ${totalPrice ? totalPrice : product?.ProductPrice || NaN}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
