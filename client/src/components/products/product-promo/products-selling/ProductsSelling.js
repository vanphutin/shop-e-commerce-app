import React, { useEffect, useState } from "react";
import headphone from "../../../../assets/images/product-promo/headphone.webp";
import ProductCard from "../../product-card/ProductCard";
import { getAllProducts } from "../../../../services/apiServerviceProduct";
import "../../../../assets/styles/components/OptionPromo/__ProductsSelling.scss";
const ProductsSelling = () => {
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
  return (
    <div className="selling col-12 col-md-4">
      <div className="deal-card__header ">
        <div
          className="header-title text-center"
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            fontFamily: "DM Serif Display",
          }}
        >
          SELLING EVYDAYS
        </div>
      </div>
      {products &&
        products
          .slice(3, 5)
          .map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              productCart={product}
              mainclassName="row"
              imageclassName="col-4"
              detailclassName="col-8"
              showDate={false}
              Linkto="products/detail"
            />
          ))}
    </div>
  );
};

export default ProductsSelling;
