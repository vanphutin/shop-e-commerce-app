import React, { useContext, useEffect, useState } from "react";
import ShopItem from "./ShopItem";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/apiservices";
import { AuthContext } from "../../context/AuthProvider";
import "../../assets/styles/components/shop/__shopProfile.scss";
import { getShopInfo } from "../../services/apiSererviceShop";
import ProductCard from "../products/product-card/ProductCard";
import LoadingSpin from "../common/LoadingSpin";

function ShopProfile() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [userShop, setUserShop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesUrl, setCategoriesUrl] = useState([]);
  useEffect(() => {
    if (id) {
      fetchUser(id);
      getShopProduct(id, categoriesUrl);
    }
  }, [categoriesUrl]);
  const fetchUser = async (id) => {
    const res = await getUser(id);
    if (res.code !== 200) {
      setLoading(true);
      return <p>Error, reload app please !</p>;
    }
    setLoading(false);
    setUserShop(res.data);
  };

  const getShopProduct = async (id, categoriesUrl) => {
    try {
      const res = await getShopInfo(id, categoriesUrl);
      if (res.code !== 200) {
        return <p>No data, ERROR SERVER</p>;
      }
      setCategories(res.data.categories);
      setProducts(res.data.products);
    } catch (error) {
      new Error("Error");
    }
  };

  const handleGetValue = (e) => {
    setCategoriesUrl(e.target.dataset.categorie);
  };

  const handleResetCategories = () => {
    setCategoriesUrl();
  };

  return (
    <div className="shop__profile container">
      <div className="shop__profile-main">
        {loading ? (
          <LoadingSpin />
        ) : (
          <ShopItem
            shopList={userShop}
            rowItem="row"
            avatarClassName="col-6 col-md-2"
            infoClassName="col-6 col-md-10"
            LinkTo={"#/#"}
            chat={user?.id !== userShop.id ? true : false}
            hr={true}
          />
        )}
      </div>
      <div className="shop__profile-body">
        <div className="shop__profile-body-title title-info-categories">
          Featured Categories
          <ul>
            {categories && categories.length > 0 && (
              <li className="categorie-items " onClick={handleResetCategories}>
                All
              </li>
            )}
            {categories && categories.length > 0 ? (
              categories.map((items, index) => (
                <li
                  className="categorie-items "
                  key={index + 1}
                  data-categorie={items}
                  onClick={(e) => handleGetValue(e)}
                >
                  {items}
                </li>
              ))
            ) : (
              <p style={{ color: "red", textAlign: "center", margin: "auto" }}>
                {" "}
                No categories yet !
              </p>
            )}
          </ul>
        </div>
        <div className="shop__profile-body-title title-info-product">
          Other products
          <div className="body__cart row">
            {products && products.length > 0 ? (
              products.map((items, index) => (
                <div className="body__cart-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3">
                  <ProductCard
                    productCart={items}
                    key={index + 1}
                    mainclassName="row"
                    imageclassName="col-12"
                    detailclassName="col-12"
                    showButton={true}
                    Linkto={`/products/detail`}
                    sizeImg={250}
                    heightSize={250}
                  />
                </div>
              ))
            ) : (
              <p style={{ color: "red", textAlign: "center" }}>
                {" "}
                No products yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopProfile;
