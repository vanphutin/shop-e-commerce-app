import React from "react";
import CardData from "../card-item/dashboad/CardData";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";

import { FaFirstOrder } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";

const Dashboard = () => {
  const data = [
    {
      _id: 1,
      icon: <RiMoneyDollarCircleLine />,
      title: "Total Revenue",
      parameter: "$ 130.800",
    },
    {
      _id: 2,
      icon: <FaFirstOrder />,
      title: "Total Orders",
      parameter: "123.97",
    },
    { _id: 3, icon: <BiFoodMenu />, title: "Total Menu", parameter: "123.63" },
    {
      _id: 4,
      icon: <FaUserFriends />,
      title: "Total Staff",
      parameter: "42432",
    },
  ];
  return (
    <div className="dashboard ">
      <ul className="dashboard-items row">
        {data
          ? data.map((items, index) => {
              return (
                <li
                  key={index}
                  className="col-12 col-md-6 col-lg-3 gy-3"
                  style={{ listStyle: "none" }}
                >
                  <CardData data={items} />
                </li>
              );
            })
          : "No data"}
      </ul>
    </div>
  );
};

export default Dashboard;
