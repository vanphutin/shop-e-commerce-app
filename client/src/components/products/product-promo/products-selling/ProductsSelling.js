import React from "react";
import headphone from "../../../../assets/images/product-promo/headphone.webp";
import ProductCart from "../../product-card/ProductCart";
const ProductsSelling = () => {
  let products = [
    {
      id: 1,
      name: "Leather Wallet",
      image: headphone,
      oldPrice: 49.99,
      newPrice: 39.99,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      image: headphone,
      oldPrice: 129.95,
      newPrice: 99.95,
    },
    {
      id: 3,
      name: "4K Smart TV",
      image: headphone,
      oldPrice: 299.0,
      newPrice: 249.0,
    },
  ];
  return (
    <div className="col-12 col-md-4">
      <div className="deal-card__header ">
        <div className="header-title text-center">
          DEAL OF THE DAYS PRODUCTS
        </div>
      </div>
      {products &&
        products
          .slice(0, 2)
          .map((product) => (
            <ProductCart
              key={product.id}
              productCart={product}
              mainClass="row"
              imageClass="col-4"
              detailClass="col-8"
              showDate={false}
            />
          ))}
    </div>
  );
};

export default ProductsSelling;
