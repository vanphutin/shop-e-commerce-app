import React from "react";
import HeaderPage from "./HeaderPage";
import Carousel from "../components/banner-slide/Carousel";
import OptionPromo from "../components/option-promo/OptionPromo";
import ProductsPage from "./ProductsPage";

const HomePage = () => {
  return (
    <main>
      <HeaderPage />
      <div className="main-content container">
        <Carousel />
        <OptionPromo />
        <ProductsPage />
      </div>
    </main>
  );
};

export default HomePage;
