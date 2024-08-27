import React, { useContext, useEffect, useState } from "react";
import ShopItem from "../components/shop-page/ShopItem";
import "../assets/styles/components/shop/__ShopCart.scss";
import { AuthContext } from "../context/AuthProvider";
import { getAllUsers } from "../services/apiservices";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LoadingSpin from "../components/common/LoadingSpin";

const ShopPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchUsers(user.id);
    } else {
      fetchUsers();
    }
  }, [user?.id]);
  const fetchUsers = async (id) => {
    const res = await getAllUsers(id);
    if (res.code !== 200) {
      return <p>No data users</p>;
    }
    setUsers(res.data);
  };

  return (
    <div className="shop__list container ">
      <div className="shop__list-title">
        <h1 className="title mb-4 fw-bold">
          All the booths for the style you love !
        </h1>
      </div>
      <ul className="shop__list-items row">
        {users && users.length > 0 ? (
          users.map((item) =>
            item.role === "seller" ? (
              <li
                className="shop__list-item col-12 col-md-6 col-lg-3 mt-3"
                key={item.id}
              >
                <ShopItem shopList={item} hr={false} who="" LinkTo="detail" />
              </li>
            ) : null
          )
        ) : (
          <LoadingSpin size="10px" />
        )}
      </ul>
    </div>
  );
};

export default ShopPage;
