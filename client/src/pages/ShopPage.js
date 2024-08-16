import React, { useContext, useEffect, useState } from "react";
import ShopItem from "../components/shop-page/ShopItem";
import "../assets/styles/components/shop/__ShopCart.scss";
import { AuthContext } from "../context/AuthProvider";
import { getAllUsers } from "../services/apiservices";

const ShopPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.id) {
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
      {user && user.role === "seller" && (
        <div className="shop__list-user">
          <ShopItem
            infoClassName="col-10"
            avatarClassName="col-2"
            shopList={user}
            hr={true}
            rowItem="row"
            who="you"
            LinkTo="detail"
            btnEdit={true}
          />
        </div>
      )}
      <ul className="shop__list-items row">
        {users && users.length > 0
          ? users.map((item, index) => (
              <li className="shop__list-item col-3 mt-3" key={index}>
                <ShopItem shopList={item} hr={false} who="" LinkTo="detail" />
              </li>
            ))
          : "No Data"}
      </ul>
    </div>
  );
};

export default ShopPage;
