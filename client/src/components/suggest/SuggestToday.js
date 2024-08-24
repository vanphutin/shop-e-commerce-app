import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../products/product-card/ProductCard";
import "../../assets/styles/components/sugges/__SuggestToday.scss";
import headephone from "../../assets/images/product-promo/headphone.webp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProducts } from "../../services/apiServerviceProduct";
import { AuthContext } from "../../context/AuthProvider";
import { postAddCart } from "../../services/apiServerviceCart";
var Loader = require("react-loaders").Loader;

const SuggestToday = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      const res = await getAllProducts();
      if (res.code !== 200) {
        return toast.error("error");
      }
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="suggest-today">
      <div className="suggest-today__header featured-categories__header deal-card__header ">
        <div className="header-title text-center">Suggest Today</div>
      </div>
      <div className="suggest-today__main row">
        {products ? (
          products.slice(0, 20).map((product, index) => (
            <div
              className="main-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3 "
              key={`${product.id}-${index}`}
            >
              <ProductCard
                productCart={product}
                mainclassName="row"
                imageclassName="col-12"
                detailclassName="col-12"
                showButton={true}
                Linkto="products/detail"
              />
            </div>
          ))
        ) : (
          <Loader type="line-scale" active />
        )}
      </div>
      <div className="suggest-today__footer text-center">
        <Link to="products">
          <button className="btn btn-outline-secondary my-3">
            View All Products
          </button>
        </Link>

        {/* link to all products page */}
      </div>
    </div>
  );
};

export default SuggestToday;
