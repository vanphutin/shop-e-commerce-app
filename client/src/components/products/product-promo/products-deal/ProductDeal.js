import React, { useEffect, useState } from "react";
import ProductCard from "../../product-card/ProductCard";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";
import headphone from "../../../../assets/images/product-promo/headphone.webp";
import "../../../../assets/styles/components/products/products-deal/__ProductsDealCart.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { getAllProducts } from "../../../../services/apiServerviceProduct";

const ProductDeal = () => {
  //api productPromo

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
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
  const handleNext = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="col-12 col-md-8">
      <div className="deal-card__header row">
        <div
          className="header-title col-9"
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            fontFamily: "DM Serif Display",
          }}
        >
          DEAL OF THE DAYS PRODUCTS
        </div>
        <div className="header-pagination col-3">
          <span className="header-pagination__prev" onClick={handlePrev}>
            <GrFormPrevious />
          </span>
          <span className="header-pagination__next" onClick={handleNext}>
            <GrFormNext />
          </span>
        </div>
      </div>
      {products && products.length > 0 && (
        <ProductCard
          productCart={products[currentProductIndex]}
          addIcon={FaCartPlus}
          favoriteIcon={FaStar}
          viewIcon={FaEye}
          mainclassName="row"
          imageclassName="col-4"
          detailclassName="col-8"
          showDate={true}
          showButton={true}
          endDate="2024-08-31T00:00:00"
          Linkto="products/detail"
        />
      )}
    </div>
  );
};

export default ProductDeal;
