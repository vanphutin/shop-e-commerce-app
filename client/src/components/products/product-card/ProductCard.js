import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import "../../../assets/styles/components/product-card/__ProductCard.scss";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";
import { postAddCart } from "../../../services/apiServerviceCart";
import { postFavouriteProducts } from "../../../services/apiServerviceHeart";

const ProductCard = ({
  productCart,
  addIcon: AddIcon,
  favoriteIcon: FavoriteIcon,
  viewIcon: ViewIcon,
  mainclassName,
  imageclassName,
  detailclassName,
  showDate,
  showButton,
  Linkto,
  endDate, // Added endDate prop
}) => {
  const {
    ProductID,
    ProductImage,
    ProductName,
    oldPrice,
    ProductPrice,
    ProductLongDesc,
  } = productCart;
  const { user } = useContext(AuthContext);
  const TOKEN = localStorage.getItem("token");
  const [size, setSize] = useState("null");
  const { id } = useParams();
  const [quantity, setQuantily] = useState(1);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("null");
  const [listHeart, setListHeart] = useState([]);
  const nagigate = useNavigate();

  const calculateTimeLeft = () => {
    let difference = +new Date(endDate) - +new Date();
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
  }, [endDate]);

  //fetch api add cart
  const FetchAddToCart = async (id) => {
    console.log("products", id);

    try {
      if (user && TOKEN) {
        const res = await postAddCart(user?.id, id, quantity, size, notes);
        console.log("res", res);

        return toast.success("Add product successfully");
      }
      toast.error("You are not logged in !");
      nagigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  //fetch api  Favourite
  const fetchApiFavourite = async (userID, productID) => {
    const res = await postFavouriteProducts(userID, productID);
    if (res.code !== 200) {
      return toast.error("error server");
    }
    console.log("res", res);
  };

  const handleFavourite = (id) => {
    // Lấy tất cả các nút có lớp "action-favourite"
    const isAction = document.querySelectorAll("button.action-favourite");
    // Duyệt qua từng nút
    isAction.forEach((item) => {
      // Kiểm tra nếu nút có data-id tương ứng với id đã truyền vào
      if (item.dataset.id === id.toString()) {
        fetchApiFavourite(user?.id, id);
        console.log("id", user?.id, id);

        // Thực hiện hành động cần thiết (ví dụ: thêm hoặc loại bỏ lớp "isActive")
        item.classList.toggle("isActive");
      }
    });
    console.log("list", listHeart);
  };

  return (
    <div className="card">
      <div className={`card-product ${mainclassName}`}>
        <div className={`card-product__image ${imageclassName}`}>
          <Link to={`${Linkto}/${ProductID}`}>
            <img
              src={`data:image/gif;base64,${ProductImage}`}
              alt={ProductName}
              className="image-product"
            />
          </Link>
        </div>
        <div className={`card-product__main ${detailclassName}`}>
          <div className="card-product__detail">
            <div className="detail-name">
              <Link to={`${Linkto}/${ProductID}`}>{ProductName}</Link>
            </div>
            <div className="detail-price">
              <div className="price-old">{oldPrice ? `$ ${oldPrice}` : ""}</div>
              <div className="price-new">${ProductPrice}</div>
            </div>

            <p className="detail-descript">
              {ProductLongDesc ? `${ProductLongDesc}` : ""}
            </p>

            {showButton && (
              <div className="detail-action">
                <button
                  className="action-add-card btn btn-primary"
                  onClick={() => FetchAddToCart(ProductID)}
                >
                  {AddIcon ? <AddIcon /> : "Add To Cart"}
                </button>
                <button
                  className="action-favourite "
                  data-id={ProductID}
                  onClick={() => handleFavourite(ProductID)}
                >
                  {FavoriteIcon ? <FavoriteIcon /> : <FaHeart />}
                </button>
                <button className="action-view">
                  <Link to={`${Linkto}/${ProductID}`}>
                    {ViewIcon ? <ViewIcon /> : <IoEyeOutline />}
                  </Link>
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

ProductCard.propTypes = {
  productCart: PropTypes.shape({
    ProductID: PropTypes.string.isRequired,
    ProductImage: PropTypes.string.isRequired,
    ProductName: PropTypes.string.isRequired,
    oldPrice: PropTypes.number,
    ProductPrice: PropTypes.number.isRequired,
    ProductLongDesc: PropTypes.string,
  }).isRequired,
  addIcon: PropTypes.elementType,
  favoriteIcon: PropTypes.elementType,
  viewIcon: PropTypes.elementType,
  mainClass: PropTypes.string,
  imageClass: PropTypes.string,
  detailClass: PropTypes.string,
  Linkto: PropTypes.string,
  showDate: PropTypes.bool,
  showButton: PropTypes.bool,
  endDate: PropTypes.string, // Added prop type for endDate
};

export default ProductCard;
