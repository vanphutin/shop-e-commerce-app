import React from "react";
import ProductCart from "../products/product-card/ProductCart";
import "../../assets/styles/components/sugges/__SuggestToday.scss";
import headephone from "../../assets/images/product-promo/headphone.webp";
const SuggestToday = () => {
  let products = [
    {
      id: 1,
      name: "Leather Wallet",
      image: headephone,
      oldPrice: 49.99,
      newPrice: 39.99,
      descript:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis at labore ducimus dignissimos deleniti sunt nemo! Sint eos adipisci minus.",
      category: "Iphone",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      image: "headphone",
      oldPrice: 129.95,
      newPrice: 99.95,
      descript:
        "Wireless noise-canceling headphones with Bluetooth connectivity.",
      category: "Samsung",
    },
    {
      id: 3,
      name: "4K Smart TV",
      image: "tv",
      oldPrice: 299.0,
      newPrice: 249.0,
      descript: "55-inch 4K Smart LED TV with HDR support.",
      category: "apple watch",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      image: "speaker",
      oldPrice: 79.99,
      newPrice: 59.99,
      descript: "Portable Bluetooth speaker with 360-degree sound.",
      category: "electronics",
    },
    {
      id: 5,
      name: "Smartphone",
      image: "smartphone",
      oldPrice: 699.0,
      newPrice: 649.0,
      descript: "Latest model smartphone with advanced features.",
      category: "mobile",
    },
    {
      id: 6,
      name: "Laptop",
      image: "laptop",
      oldPrice: 999.0,
      newPrice: 899.0,
      descript: "Lightweight laptop with 16GB RAM and 512GB SSD.",
      category: "computers",
    },
    {
      id: 7,
      name: "Smartwatch",
      image: "smartwatch",
      oldPrice: 199.99,
      newPrice: 149.99,
      descript: "Smartwatch with fitness tracking and heart rate monitor.",
      category: "wearables",
    },
    {
      id: 8,
      name: "Tablet",
      image: "tablet",
      oldPrice: 499.0,
      newPrice: 449.0,
      descript: "10-inch tablet with high-resolution display.",
      category: "gadgets",
    },
    {
      id: 9,
      name: "Gaming Console",
      image: "console",
      oldPrice: 399.0,
      newPrice: 349.0,
      descript: "Next-gen gaming console with 4K support.",
      category: "gaming",
    },
    {
      id: 10,
      name: "Digital Camera",
      image: "camera",
      oldPrice: 599.0,
      newPrice: 549.0,
      descript: "DSLR camera with 24.2 MP and 4K video recording.",
      category: "cameras",
    },
    {
      id: 11,
      name: "Wireless Mouse",
      image: "mouse",
      oldPrice: 29.99,
      newPrice: 19.99,
      descript: "Ergonomic wireless mouse with adjustable DPI.",
      category: "accessories",
    },
  ];

  return (
    <div className="suggest-today">
      <div className="suggest-today__header featured-categories__header deal-card__header ">
        <div className="header-title text-center">Suggest Today</div>
      </div>
      <div className="suggest-today__main row">
        {products.slice(0, 20).map((product) => (
          <div
            className="main-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3 "
            key={product.id}
          >
            <ProductCart
              productCart={product}
              mainClass="row"
              imageClass="col-12"
              detailClass="col-12"
              showButton={true}
            />
          </div>
        ))}
      </div>
      <div className="suggest-today__footer text-center">
        <button className="btn btn-outline-secondary btn-lg">
          View All Products
        </button>
        {/* link to all products page */}
      </div>
    </div>
  );
};

export default SuggestToday;
