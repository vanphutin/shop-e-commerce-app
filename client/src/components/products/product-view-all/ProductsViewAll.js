import React from "react";
import Sidebar from "./content/ProductSiderbar";
import ProductItems from "./content/ProductItems";
import "../../../assets/styles/components/product-view-all/_ProductsViewAll.scss";

const ProductsViewAll = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <ProductItems />
    </div>
  );
};

export default ProductsViewAll;
