import React, { useContext, useEffect, useState } from "react";
import { getFavourite } from "../../../services/apiServerviceHeart";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";
import { FaRegHeart } from "react-icons/fa";
import "../../../assets/styles/components/products/product-favourited/__favourited.scss";
import ProductCard from "../product-card/ProductCard";

const ProductFavourite = () => {
  const { user } = useContext(AuthContext);
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    if (user && user?.id) {
      fetchGetFavourite(user.id);
    }
  }, [user?.id]);
  const fetchGetFavourite = async (id) => {
    const res = await getFavourite(id);
    if (res.code !== 200) {
      return console.log("Error server !");
    }
    setFavourite(res.data);
  };
  return (
    <div className=" favourite row container">
      <h3>Your Favourit cart</h3>
      {favourite?.length > 0 ? (
        <ul className=" row">
          {favourite.map((item, index) => (
            <li
              className="main-items col-12 col-md-4 col-sm-5 col-lg-3 gy-3 "
              key={`${favourite.id}-${index}`}
            >
              <ProductCard
                productCart={item}
                mainclassName="row"
                imageclassName="col-12"
                detailclassName="col-12"
                showButton={true}
                Linkto="/products/detail"
              />
            </li>
          ))}
          <li></li>
        </ul>
      ) : (
        <p>Product no foud</p>
      )}
    </div>
  );
};

export default ProductFavourite;
