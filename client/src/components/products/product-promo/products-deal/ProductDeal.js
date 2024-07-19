import React, { useState } from "react";
import ProductCart from "../../product-card/ProductCart";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";
import headphone from "../../../../assets/images/product-promo/headphone.webp";
import "../../../../assets/styles/components/products/products-deal/__ProductsDealCart.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ProductDeal = () => {
  //api productPromo
  let products = [
    {
      id: 1,
      name: "Leather Wallet",
      image: headphone,
      oldPrice: 49.99,
      newPrice: 39.99,
      descript:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis at labore ducimus dignissimos deleniti sunt nemo! Sint eos adipisci minus.",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      image: headphone,
      oldPrice: 129.95,
      newPrice: 99.95,
      descript:
        "Wireless noise-canceling headphones with Bluetooth connectivity.",
    },
    {
      id: 3,
      name: "4K Smart TV",
      image: headphone,
      oldPrice: 299.0,
      newPrice: 249.0,
      descript: "55-inch 4K Smart LED TV with HDR support.",
    },
  ];

  const [currentProductIndex, setCurrentProductIndex] = useState(0);

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
        <div className="header-title col-9">DEAL OF THE DAYS PRODUCTS</div>
        <div className="header-pagination col-3">
          <span className="header-pagination__prev" onClick={handlePrev}>
            <GrFormPrevious />
          </span>
          <span className="header-pagination__next" onClick={handleNext}>
            <GrFormNext />
          </span>
        </div>
      </div>
      <ProductCart
        productCart={products[currentProductIndex]}
        favoriteIcon={FaStar}
        viewIcon={FaEye}
        mainClass="row"
        imageClass="col-4"
        detailClass="col-8"
        showDate={true}
        showButton={true}
      />
    </div>
  );
};

export default ProductDeal;
