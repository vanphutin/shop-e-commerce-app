import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../products/product-card/ProductCard";
import "../../assets/styles/components/sugges/__SuggestToday.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProducts } from "../../services/apiServerviceProduct";
var Loader = require("react-loaders").Loader;

const SuggestToday = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fakeProductLoading, setFakeLoadingProduct] = useState([]);

  useEffect(() => {
    getProduct();
    fakeProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await getAllProducts();
      if (res.code !== 200) {
        toast.error("Error fetching products");
        setLoading(false); // Stop loading if there's an error
        return;
      }
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false); // Stop loading after data fetching is done
    }
  };
  const fakeProduct = () => {
    const fakeProducts = [];
    for (let i = 0; i <= 7; i++) {
      fakeProducts.push({
        ProductID: i,
        ProductName: "",
        ProductPrice: "",
        ProductWeight: "",
        ProductLongDesc: "",
        ProductImage: "",
        ProductCategoryID: "1",
        ProductUpdateDate: "2024-08-21T11:32:25.000Z",
        ProductStock: "",
        Deleted: "",
        UserID: "1",
        createdAt: "",
        updatedAt: "2024-08-21T11:32:25.000Z",
        CategoryName: "",
      });
    }
    setFakeLoadingProduct(fakeProducts);
  };

  return (
    <div className="suggest-today">
      <div className="suggest-today__header featured-categories__header deal-card__header">
        <div className="header-title text-center">Suggest Today</div>
      </div>
      <div className="suggest-today__main row">
        {loading ? (
          <>
            <Loader type="line-scale" active />
            <p className="text-center ">Loading ...</p>
            {fakeProductLoading.map((items, index) => (
              <div
                className="main-items main-items-loading  col-12 col-md-4 col-sm-5 col-lg-3 gy-3"
                key={`${items.id}-${index}`}
              >
                <ProductCard
                  productCart={items}
                  mainclassName="row"
                  imageclassName="col-12"
                  detailclassName="col-12"
                  showButton={false}
                  Linkto="products/detail"
                />
              </div>
            ))}
          </>
        ) : (
          products.slice(0, 20).map((product, index) => (
            <div
              className="main-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3"
              key={`${product.id}-${index}`}
            >
              <ProductCard
                productCart={product}
                mainclassName="row"
                imageclassName="col-12"
                detailclassName="col-12"
                showButton={true}
                Linkto="products/detail"
              />
            </div>
          ))
        )}
      </div>
      <div className="suggest-today__footer text-center">
        <Link to="products">
          <button className="btn btn-outline-secondary my-3">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuggestToday;
