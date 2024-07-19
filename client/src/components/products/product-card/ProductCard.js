import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import "../../../assets/styles/components/product-card/__ProductCard.scss";

const ProductCart = ({
  productCart,
  addIcon: AddIcon,
  favoriteIcon: FavoriteIcon,
  viewIcon: ViewIcon,
  mainClass,
  imageClass,
  detailClass,
  showDate,
  showButton,
}) => {
  const { image, name, oldPrice, newPrice, descript } = productCart;
  const calculateTimeLeft = () => {
    //fake days
    const getDays = new Date().getDate() + 1;
    let difference = +new Date(`2024-07-${getDays}T00:00:00`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="card">
      <div className={`card-product ${mainClass}`}>
        <div className={`card-product__image ${imageClass}`}>
          <img src={image} alt={name} className="image-product" />
        </div>
        <div className={`card-product__main ${detailClass}`}>
          <div className="card-product__detail">
            <div className="detail-name">{name}</div>
            <div className="detail-price">
              <div className="price-old">{oldPrice ? `$ ${oldPrice}` : ""}</div>
              <div className="price-new">${newPrice}</div>
            </div>
            <p className="detail-descript">{descript ? `${descript}` : ""}</p>
            {showButton && (
              <div className="detail-action">
                <button className="action-add-card btn btn-primary">
                  {AddIcon ? <AddIcon /> : "Add To Cart"}
                </button>
                <button className="action-favourite">
                  {FavoriteIcon ? <FavoriteIcon /> : <FaRegHeart />}
                </button>
                <button className="action-view">
                  {ViewIcon ? <ViewIcon /> : <IoEyeOutline />}
                </button>
              </div>
            )}
          </div>
          {showDate && (
            <div className="card-product__date d-flex">
              <div className="detail-time">
                <p className="time">{timeLeft.days}</p>
                <p className="title">Days</p>
              </div>
              <div className="detail-time">
                <p className="time">{timeLeft.hours}</p>
                <p className="title">Hrs</p>
              </div>
              <div className="detail-time">
                <p className="time">{timeLeft.minutes}</p>
                <p className="title">Min</p>
              </div>
              <div className="detail-time">
                <p className="time">{timeLeft.seconds}</p>
                <p className="title">Sec</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCart.propTypes = {
  productCart: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    oldPrice: PropTypes.number.isRequired,
    newPrice: PropTypes.number.isRequired,
    descript: PropTypes.string.isRequired,
  }).isRequired,
  addIcon: PropTypes.elementType,
  favoriteIcon: PropTypes.elementType,
  viewIcon: PropTypes.elementType,
  mainClass: PropTypes.string,
  imageClass: PropTypes.string,
  detailClass: PropTypes.string,
  showDate: PropTypes.bool,
};

ProductCart.defaultProps = {
  mainClass: "",
  imageClass: "",
  detailClass: "",
  showDate: false,
};

export default ProductCart;
