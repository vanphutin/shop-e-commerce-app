import React from "react";
import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import HOST_IMG from "../common/HostImg";

const ShopItem = ({
  shopList,
  hr,
  avatarClassName,
  infoClassName,
  rowItem,
  who,
  btnEdit,
  LinkTo,
  chat,
}) => {
  const { id, avatar, lastname, firstname, username, city, address } = shopList;
  return (
    <div className="shop ">
      <div className={`shop__item ${rowItem} `}>
        <div className={`shop__item-avata ${avatarClassName}`}>
          <Link to={`${LinkTo}/${id}`}>
            <img
              src={`${HOST_IMG}/${avatar}`}
              alt={`${firstname} ${lastname}`}
              className="avata-user"
              width="150px"
              height="150px"
            />
          </Link>
        </div>
        <div className={`shop__item-info ${infoClassName}`}>
          {who ? <div className="shop__item-who">{who}</div> : ""}
          <div className="shop__item-name">
            {firstname} {lastname}
          </div>
          <div className="shop__item-username">@{username}</div>
          <div className="shop__item-city">
            <FaLocationDot size="15px" />
            {city || address?.city}
          </div>
          {btnEdit && (
            <Link to="/profile">
              <button className="btn btn-dark btn-sm shop__item-edit">
                Edit
              </button>
            </Link>
          )}
          {chat && (
            <div className="shop__item-chat">
              {" "}
              <IoChatbubbleEllipsesSharp />
              Chat
            </div>
          )}
        </div>
      </div>
      {hr ? <hr /> : ""}
    </div>
  );
};
ShopItem.propTypes = {
  shopList: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  hr: PropTypes.bool,
  avatarClassName: PropTypes.string,
  infoClassName: PropTypes.string,
  who: PropTypes.string,
  rowItem: PropTypes.string,
  btnEdit: PropTypes.bool,
  chat: PropTypes.bool,
};

export default ShopItem;
