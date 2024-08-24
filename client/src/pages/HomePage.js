import React from "react";
import HeaderPage from "./HeaderPage";
import Carousel from "../components/banner-slide/Carousel";
import OptionPromo from "../components/option-promo/OptionPromo";
import ProductsPage from "./ProductsPage";
import RolePage from "./RolePage";

const HomePage = () => {
  return (
    <main>
      <HeaderPage />
      <div className="main-content container">
        <Carousel />
        <OptionPromo />
        <ProductsPage />
        <RolePage />
      </div>
    </main>
  );
};

export default HomePage;
