import React from "react";
import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";

const ShopItem = ({
  shopList,
  hr,
  avatarClassName,
  infoClassName,
  rowItem,
  who,
  btnEdit,
}) => {
  const { image, name, username, city } = shopList;
  return (
    <div className="shop ">
      <div className={`shop__item ${rowItem} `}>
        <div className={`shop__item-avata ${avatarClassName}`}>
          <img
            src={image}
            alt=""
            className="avata-user"
            width="150px"
            height="150px"
          />
        </div>
        <div className={`shop__item-info ${infoClassName}`}>
          {who ? <div className="shop__item-who">{who}</div> : ""}
          <div className="shop__item-name">{name}</div>
          <div className="shop__item-username">@{username}</div>
          <div className="shop__item-city">
            <FaLocationDot size="15px" />
            {city}
          </div>
          {btnEdit && (
            <button className="btn btn-dark btn-sm shop__item-edit">
              Edit
            </button>
          )}
        </div>
      </div>
      {hr ? <hr /> : ""}
    </div>
  );
};
ShopItem.propTypes = {
  shopList: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  hr: PropTypes.bool,
  avatarClassName: PropTypes.string,
  infoClassName: PropTypes.string,
  who: PropTypes.string,
  rowItem: PropTypes.string,
  btnEdit: PropTypes.bool,
};

export default ShopItem;
