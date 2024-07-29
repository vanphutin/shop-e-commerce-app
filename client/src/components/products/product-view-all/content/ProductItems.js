import React, { useEffect, useState } from "react";
import ProductCard from "../../product-card/ProductCard";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";
import "../../../../assets/styles/components/sugges/__SuggestToday.scss";
import { getAllProducts } from "../../../../services/apiServerviceProduct";

const ProductItems = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      const res = await getAllProducts();
      if (res.code !== 200) {
      }
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("products", products);
  return (
    <div className="product-items ">
      <h3>Search results for keyword (Headphone)</h3>
      <div className="row suggest-today">
        {products
          ? products.map((product) => (
              <div
                className="main-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3 "
                key={product.id}
              >
                <ProductCard
                  productCart={product}
                  mainClass="row"
                  imageClass="col-12"
                  detailClass="col-12"
                  showButton={true}
                />
              </div>
            ))
          : "No data !"}
      </div>
    </div>
  );
};

export default ProductItems;
