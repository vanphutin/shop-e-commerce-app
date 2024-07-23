import React, { useContext } from "react";
import "../assets/styles/components/role/__role.scss";
import sellerImage from "../assets/images/role/sellerIMAGE.jpg";
import { FcNext } from "react-icons/fc";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const RolePage = () => {
  const { user } = useContext(AuthContext);
  const linkPath = user
    ? user.role === "seller"
      ? "/"
      : `/register-seller/${user.id}`
    : "/login";
  const handleClick = (e) => {
    e.stopPropagation();
    console.log("ok");
    if (user && user.role === "seller") {
      return toast.info("You are now the seller!");
    }
  };
  return (
    <div className="seller">
      <div className="seller-main ">
        <div className="seller-main_title">
          <p className="seller-main_title-header"> BECOME AN SELLER</p>
          <div className="seller-main_title-body ">
            Are you passionate about business and eager to turn your hobby into
            profit? Join us and become a seller today! With our platform, you
            will have the opportunity to reach millions of potential customers
            and build your personal brand. Enjoy easy registration, 24/7
            support, and smart management tools to help you start strong and
            grow your business sustainably. Begin your journey to success with
            us now!
          </div>
          <div className="seller-main_title-footer">
            <Link to={linkPath} onClick={handleClick}>
              <button className="btn btn-register">
                Register now <FcNext className="btn-register__icon" />
              </button>
            </Link>
          </div>
        </div>
        <div className="seller-main_image d-none d-md-block">
          <img
            src={sellerImage}
            alt="sellerImage"
            className="seller-main_image-img"
          />
        </div>
      </div>
    </div>
  );
};

export default RolePage;
