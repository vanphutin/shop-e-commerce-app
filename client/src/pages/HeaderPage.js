import "../assets/styles/pages/__header.scss";
import React, { memo, useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { TfiAlignJustify } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { getSearchProduct } from "../services/apiServerviceProduct";
import HOST_IMG from "../components/common/HostImg";

const HeaderPage = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigation = useNavigate();
  const [productSearch, setProductSearch] = useState([]);

  const TOKEN = localStorage.getItem("token");
  const handleShowMenu = () => {
    const nav_menu = document.querySelectorAll(".show-phone");
    nav_menu.forEach((item) => {
      item.classList.toggle("show");
    });
  };
  const handleToggleMenu = () => {
    const subMenu = document
      .querySelector(".dropdown-menu")
      .classList.toggle("show");
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.success("Logout success !");
  };
  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await getSearchProduct(search);

      if (res.code !== 200) {
        return toast.error("Error!");
      }
      setProductSearch(res.data);
      // Điều hướng đến trang "/products" và truyền 'search' dưới dạng state
      navigation("/products", { state: { search, productSearch: res.data } }); // Sửa lại cú pháp truyền state
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Product not found");
    }
  };

  return (
    <>
      <header className="container-fluid p-1 text-bg-black">
        <nav className="container row  text-center">
          <div className="nav-icon__logo col-lg-2 col-6 col-md-4 text-left col-xl-2">
            {/* <GiShop /> */}
            <Link to="/">
              <p> VANPHUTIN.SHOP</p>
            </Link>
          </div>
          <div className="nav-icon__more d-md-none  col-6 text-end ">
            <TfiAlignJustify onClick={handleShowMenu} />
          </div>

          <div className="nav-menu d-none show-phone d-md-block col-xl-4 col-md-4">
            <ul className="nav-menu__item">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="nav-search d-none  d-xl-block col-xl-3 ">
            <form>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span
                className="nav-search__icon-search"
                onClick={handleSearchProduct}
              >
                <CiSearch />
              </span>
            </form>
          </div>
          {TOKEN ? (
            <>
              <div className="nav-auth col-12 show-phone d-none d-md-flex col-xl-3 col-md-4 dropdown text-end d-flex align-items-center">
                <p className="heart me-4 p-0 mb-0">
                  <Link to="/favourited">
                    <FaHeart fontSize="25px" />
                  </Link>
                </p>
                <p onClick={() => {}} className="me-4 p-0 mb-0">
                  <Link to="/cart" state={{ id: user?.id }}>
                    <FaCartPlus fontSize="25px" />
                  </Link>
                </p>

                <div className="dropdown" onClick={handleToggleMenu}>
                  <Link
                    className="link-body-emphasis text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    to="#"
                  >
                    <img
                      src={
                        user?.avatar === "no image"
                          ? "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                          : `${user?.avatar}`
                      }
                      alt="User avatar"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                    <span>{user?.username}</span>
                  </Link>
                  <ul
                    className="dropdown-menu text-small  "
                    style={{ right: "0" }}
                  >
                    {user?.role === "seller" ||
                    user?.role === "administrator" ? (
                      <li>
                        <Link to="/admin" className="dropdown-item">
                          Admin
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Wallet
                      </a>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="dropdown-item"
                        onClick={handleLogOut}
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="nav-auth col-12 show-phone d-none d-md-block col-xl-3 col-md-4">
              <Link to="/login">
                <button className="btn btn-info nav-auth__btn nav-auth__login">
                  Login
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="btn btn-dark nav-auth__btn nav-auth__sign-up">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default memo(HeaderPage);
