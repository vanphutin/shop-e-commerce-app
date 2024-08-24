import React from "react";
import ProductPromo from "../components/products/product-promo/ProductPromo";
import FeaturedCategories from "../components/category/FeaturedCategories";
import SuggestToday from "../components/suggest/SuggestToday";

const ProductsPage = () => {
  return (
    <div>
      <FeaturedCategories />
      <ProductPromo />
      <SuggestToday />
    </div>
  );
};

export default ProductsPage;
