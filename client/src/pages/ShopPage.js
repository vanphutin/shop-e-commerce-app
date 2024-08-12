import React, { useContext } from "react";
import ShopItem from "../components/shop-page/ShopItem";
import "../assets/styles/components/shop/__ShopCart.scss";
import { AuthContext } from "../context/AuthProvider";

const ShopPage = () => {
  const { user } = useContext(AuthContext);
  const shopList = [
    {
      _id: "1",
      image:
        "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg",
      who: "you",
      name: "Van Phu Tin",
      username: "vanphutin",
      city: "Da Nang",
    },
    {
      _id: "1",
      image:
        "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg",
      name: "Van Phu Tin",
      username: "vanphutin",
      city: "Da Nang",
    },
    {
      _id: "1",
      image:
        "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg",
      name: "Van Phu Tin",
      username: "vanphutin",
      city: "Da Nang",
    },
    {
      _id: "1",
      image:
        "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg",
      name: "Van Phu Tin",
      username: "vanphutin",
      city: "Da Nang",
    },
    {
      _id: "1",
      image:
        "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg",
      who: "you",
      name: "Van Phu Tin",
      username: "vanphutin",
      city: "Da Nang",
    },
  ];
  return (
    <div className="shop__list container ">
      <div className="shop__list-title">
        <h2 className="title">All the booths for the style you love !</h2>
      </div>
      {user && user.role === "seller" && (
        <div className="shop__list-user">
          <ShopItem
            infoClassName="col-10"
            avatarClassName="col-2"
            shopList={shopList[0]}
            hr={true}
            rowItem="row"
            who="you"
            btnEdit={true}
          />
        </div>
      )}
      <ul className="shop__list-items row">
        {shopList && shopList.length > 0
          ? shopList.map((item, index) => (
              <li className="shop__list-item col-3 mt-3" key={index}>
                <ShopItem
                  //   infoClassName="col-9"
                  //   avatarClassName="col-3"
                  shopList={item}
                  hr={false}
                  who=""
                />
              </li>
            ))
          : "No Data"}
      </ul>
    </div>
  );
};

export default ShopPage;
