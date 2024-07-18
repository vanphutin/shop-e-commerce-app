import React, { Fragment } from "react";
import ProductDeal from "./products-deal/ProductDeal";
import ProductsSelling from "./products-selling/ProductsSelling";

const ProductPromo = () => {
  return (
    <div className="row my-3">
      <ProductDeal />
      <ProductsSelling />
    </div>
  );
};

export default ProductPromo;
